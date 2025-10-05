# Book Review Platform

A full-stack web application for managing personal book collections, submitting and managing reviews, and visualizing ratings. Built with **React**, **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

- **Frontend:** [Live on Vercel](https://bookreviewsfrontend.vercel.app/)  
- **Backend:** [Live on Render](https://bookreviewsbackend.onrender.com/api)  

> ⚠️ **Important:** When the backend hosted on Render starts for the first request, it may take up to **50 seconds** to respond. Please wait patiently.

---

## Features

- User authentication (Sign Up / Login)
- Add, edit, and delete books
- Add, edit, and delete reviews
- One review per book per user
- Ratings distribution visualization (Pie chart)
- Profile page showing your books and given reviews
- Automatic deletion of reviews when a book is deleted
- Only owners can edit or delete their books/reviews
- Responsive and user-friendly UI

---

## Tech Stack

- **Frontend:** React, React Router, Recharts, Tailwind CSS  
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT authentication  
- **Deployment:** Render (backend), Vercel (frontend)

---

## Installation & Running Locally

### Prerequisites

- Node.js >= 18.x  
- MongoDB URI (local or cloud, e.g., MongoDB Atlas)  
- npm or yarn

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/book-review-platform.git
   cd book-review-platform/backend
````

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the backend root:

   ```env
   PORT=5000
   MONGO_URI=<Your MongoDB connection string>
   JWT_SECRET=<Your JWT secret key>
   ```
4. Start the backend server:

   ```bash
   npm run dev
   ```
5. The backend runs at `http://localhost:5000/api` by default.

> ⚠️ **Note:** If using the live backend hosted on Render, the first request may take up to **50 seconds**. Please wait for the server to wake up before performing actions like login, fetching books, or submitting reviews.

### Frontend Setup

1. Navigate to frontend folder:

   ```bash
   cd ../frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env` file in frontend root:

   ```env
   VITE_API_BASE=http://localhost:5000/api
   ```
4. Start the frontend:

   ```bash
   npm run dev
   ```
5. The frontend runs at `http://localhost:5173` (or the port Vite assigns).

> ⚠️ **Tip:** If connecting to the live backend on Render, remember the first request can take up to **50 seconds** due to cold start.

---

## How to Use

1. **Sign Up / Login**
   Create an account or log in using your credentials.

2. **Profile Page**

   * View your books and given reviews.
   * Ratings distribution chart shows the breakdown of your reviews.

3. **Manage Books**

   * Add a new book with title, author, description, genre, year, and optional image.
   * Edit or delete your books using the buttons on each book card.
   * Only the owner can edit or delete their books.

4. **Manage Reviews**

   * Submit a review for any book (one per user per book).
   * Edit or delete your reviews from the profile page.
   * Deleting a book will automatically delete all associated reviews.

5. **Ratings Visualization**

   * The profile page includes a pie chart showing your review ratings distribution.

> ⚠️ **Reminder:** When using the live backend hosted on Render, the **first request may take up to 50 seconds**. Wait before performing actions.

---

## Modifications

* **Backend:**

  * Add more fields to books or reviews by updating models (`Book.js`, `Review.js`).
  * Extend API routes in `routes/books.js` or `routes/reviews.js`.

* **Frontend:**

  * Modify UI using React components inside `src/pages` and `src/components`.
  * Update API base URL in `src/api.js` or `.env` if switching between local and live backend.

---

## Live Demo

* [Frontend on Vercel](https://bookreviewsfrontend.vercel.app/)
* [Backend on Render](https://bookreviewsbackend.onrender.com/api)

> ⚠️ **Note:** Initial requests to the Render backend may take up to **50 seconds**.

---

## License

This project is **open-source** and free to use
