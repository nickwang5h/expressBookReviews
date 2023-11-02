const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
	//Write your code here
	// return res.status(300).json({ message: "Yet to be implemented" });
	const username = req.body.username;
	const password = req.body.password;

	if (username && password) {
		if (isValid(username)) {
			users.push({ username, password });
			return res.status(200).json({ message: "User registered successfully" });
		} else {
			return res.status(404).json({ message: "User already exists!" });
		}
	}
	return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
	//Write your code here
	//   return res.status(300).json({ message: "Yet to be implemented" });
	res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
	//Write your code here
	// return res.status(300).json({ message: "Yet to be implemented" });
	let book = books[req.params.isbn];
	res.send(book);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
	//Write your code here
	// return res.status(300).json({ message: "Yet to be implemented" });
	let authorbooks = [];
	for (let [key, book] of Object.entries(books)) {
		if (book.author === req.params.author) {
			authorbooks.push(book);
		}
	}
	if (authorbooks.length === 0) {
		return res.status(404).json({ message: "No books found" });
	}
	res.send(authorbooks);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
	//Write your code here
	// return res.status(300).json({ message: "Yet to be implemented" });
	let titlebooks = [];
	for (let [key, book] of Object.entries(books)) {
		if (book.title === req.params.title) {
			titlebooks.push(book);
		}
	}
	if (titlebooks.length === 0) {
		return res.status(404).json({ message: "No books found" });
	}
	res.send(titlebooks);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
	//Write your code here
	// return res.status(300).json({ message: "Yet to be implemented" });
	let book = books[req.params.isbn];
	res.send(book.reviews);
});

module.exports.general = public_users;
