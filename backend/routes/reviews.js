const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const Book = require('../models/Book');

// Create review (any logged in user). One review per user per book.
router.post('/', auth, async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    if (!bookId || !rating) return res.status(400).json({ message: 'Missing fields' });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Check if user already reviewed -> update
    let review = await Review.findOne({ book: bookId, user: req.user.id });
    if (review) {
      review.rating = rating;
      review.comment = comment;
      await review.save();
      return res.json(review);
    }
    review = new Review({ book: bookId, user: req.user.id, rating, comment });
    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update review (owner)
router.put('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if(!review) return res.status(404).json({ message: 'Not found' });
    if(review.user.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { rating, comment } = req.body;
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;
    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete review (owner)
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if(!review) return res.status(404).json({ message: 'Not found' });
    if(review.user.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await review.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
