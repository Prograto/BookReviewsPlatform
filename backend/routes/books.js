const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book');
const Review = require('../models/Review');
const mongoose = require('mongoose');

// Create book
router.post('/', auth, async (req, res) => {
  try {
    const { title, genre, image, description, author, year } = req.body;
    const book = new Book({ title, genre, image, description, author, year, owner: req.user.id });
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get books with pagination and average rating
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.max(1, parseInt(req.query.limit || '10'));
    const skip = (page - 1) * limit;

    // aggregation to get avg rating
    const booksAgg = await Book.aggregate([
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'book',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          averageRating: { $cond: [{ $gt: [{ $size: "$reviews" }, 0 ] }, { $avg: "$reviews.rating" }, null ] },
          reviewsCount: { $size: "$reviews" }
        }
      },
      { $skip: skip },
      { $limit: limit }
    ]);

    const total = await Book.countDocuments();
    res.json({ books: booksAgg, page, totalPages: Math.ceil(total / limit), total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single book with reviews
router.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).json({ message: 'Invalid id' });

    const book = await Book.findById(bookId).lean();
    if (!book) return res.status(404).json({ message: 'Not found' });

    const reviews = await Review.find({ book: bookId }).populate('user', 'name').sort({ createdAt: -1 }).lean();
    const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : null;

    res.json({ ...book, reviews, averageRating: avg, reviewsCount: reviews.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update book (only owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if(!book) return res.status(404).json({ message: 'Not found' });
    if(book.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const allowed = ['title','genre','image','description','author','year'];
    allowed.forEach(k => { if (req.body[k] !== undefined) book[k] = req.body[k]; });
    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete book (only owner) - will also delete reviews
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if(!book) return res.status(404).json({ message: 'Not found' });
    if(book.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await Review.deleteMany({ book: book._id });
    await book.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
