const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const Promise = require("promise");

public_users.post("/register", (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  const userAlreadyExist = isValid(username);
  if (userAlreadyExist == true) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  const newUser = {
    username,
    password, // Note: In practice, you should hash the password before storing it
  };

  users.push(newUser);
  if (users) {
    return res.status(200).json({ message: "User registered successfully" });
  }
  return res.status(204).json({ message: "No record available" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  const getBooksListPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });

  // Handle the Promise
  getBooksListPromise
    .then((booksData) => {
      return res
        .status(200)
        .json({ message: "Book list fetch successfully", data: booksData });
    })
    .catch((err) => {
      console.error("Error retrieving books:", err);
      return res.status(204).json({ message: err });
    });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  const getBooksByIsbn = new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books[isbn];
      // Resolve the Promise with the books data
      resolve(book);
    }, 1000);
  });

  getBooksByIsbn
    .then((booksData) => {
      return res
        .status(200)
        .json({ message: "Book details based on isdb ", data: book });
    })
    .catch((err) => {
      console.error("Error retrieving books:", err);
      return res.status(204).json({ message: err });
    });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const author = req.params.author;
  const getBooksByAuthor = new Promise((resolve, reject) => {
    setTimeout(() => {
      const authorBooks = Object.values(books).filter(
        (book) => book.author === author
      );

      resolve(authorBooks);
    }, 1000);
  });

  // Handle the Promise
  getBooksByAuthor
    .then((authorBooks) => {
      return res
        .status(200)
        .json({ message: "Book details based on author ", data: authorBooks });
    })
    .catch((err) => {
      console.error("Error retrieving books:", err);
      return res.status(204).json({ message: err });
    });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const title = req.params.title;
  const getBooksByTitle = new Promise((resolve, reject) => {
    setTimeout(() => {
      const titleBooks = Object.values(books).filter(
        (book) => book.title === title
      );

      resolve(titleBooks);
    }, 1000);
  });

  // Handle the Promise
  getBooksByTitle
    .then((titleBooks) => {
      return res
        .status(200)
        .json({ message: "Book details based on title", data: titleBooks });
    })
    .catch((err) => {
      console.error("Error retrieving books:", err);
      return res.status(204).json({ message: err });
    });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json({ message: "book reviews fetch ", data: book });
  }
  return res.status(204).json({ message: "No record available" });
});

module.exports.general = public_users;
