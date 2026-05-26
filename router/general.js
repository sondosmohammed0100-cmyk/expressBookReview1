const express = require('express');
const axios = require('axios');

const public_users = express.Router();

// =====================
// Register User (unchanged logic)
// =====================
let users = [];

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing data" });
  }

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.json({ message: "User registered successfully" });
});

// =====================
// Get all books (Axios REQUIRED)
// =====================
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get("http://localhost:5000/books");
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// =====================
// Get book by ISBN (Axios REQUIRED)
// =====================
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;

    return res.json(books[isbn]);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book" });
  }
});

// =====================
// Get books by Author (REQUIRED FIX)
// =====================
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  try {
    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;

    let result = {};

    for (let key in books) {
      if (books[key].author === author) {
        result[key] = books[key];
      }
    }

    return res.json(result);

  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// =====================
// Get books by Title (REQUIRED FIX)
// =====================
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  try {
    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;

    let result = {};

    for (let key in books) {
      if (books[key].title === title) {
        result[key] = books[key];
      }
    }

    return res.json(result);

  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// =====================
// Get reviews by ISBN (Axios REQUIRED)
// =====================
public_users.get('/review/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  try {
    const response = await axios.get("http://localhost:5000/books");
    const books = response.data;

    return res.json(books[isbn]?.reviews || {});

  } catch (error) {
    return res.status(500).json({ message: "Error fetching reviews" });
  }
});

// =====================
module.exports.general = public_users;