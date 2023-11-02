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
			users.push({ "username": username, "password": password });
			return res.status(200).json({ message: "User registered successfully" });
		} else {
			return res.status(404).json({ message: "User already exists!" });
		}
	}
	return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
function getBookList() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(books);
		}, 6000);
	})
}

// public_users.get('/', function (req, res) {
// 	//Write your code here
// 	//   return res.status(300).json({ message: "Yet to be implemented" });
// 	res.send(JSON.stringify(books, null, 4));
// });

public_users.get('/', function (req, res) {
	//Write your code here
	//   return res.status(300).json({ message: "Yet to be implemented" });
	// res.send(JSON.stringify(books, null, 4));
	getBookList().then((bookList) => {
		res.send(JSON.stringify(bookList, null, 4));
	}).catch((err) => {
		res.status(500).json({ message: err });
	});
});

// Get book details based on ISBN
function getBookISBN(isbn) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let book = books[isbn];
			if (book) {
				resolve(book);
			} else {
				reject("Book not found");
			}
		}, 6000);
	})
}

// public_users.get('/isbn/:isbn', function (req, res) {
// 	//Write your code here
// 	// return res.status(300).json({ message: "Yet to be implemented" });
// 	let book = books[req.params.isbn];
// 	res.send(book);
// });	

public_users.get('/isbn/:isbn', function (req, res) {
	getBookISBN(req.params.isbn).then((book) => {
		res.send(book);
	}).catch((err) => {
		res.status(404).json({ message: err });
	})
});

// Get book details based on author
function getBookByAuthor(author) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let authorbooks = [];
			for (let [key, book] of Object.entries(books)) {
				if (book.author === author) {
					authorbooks.push(book);
				}
			}
			if (authorbooks.length === 0) {
				reject("No books found");
			} else {
				resolve(authorbooks);
			}
		}, 6000);
	})
}

// public_users.get('/author/:author', function (req, res) {
// 	//Write your code here
// 	// return res.status(300).json({ message: "Yet to be implemented" });
// 	let authorbooks = [];
// 	for (let [key, book] of Object.entries(books)) {
// 		if (book.author === req.params.author) {
// 			authorbooks.push(book);
// 		}
// 	}
// 	if (authorbooks.length === 0) {
// 		return res.status(404).json({ message: "No books found" });
// 	}
// 	res.send(authorbooks);
// });


public_users.get('/author/:author', function (req, res) {
	getBookByAuthor(req.params.author).then((authorbooks) => {
		if (authorbooks.length === 0) {
			res.status(404).json({ message: "No books found" });
		}
		res.send(authorbooks);
	}).catch((err) => {
		res.status(404).json({ message: err });
	})
});

// Get all books based on title
function getBooksByTitle(title) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let titleBooks = [];
			for (let [key, book] of Object.entries(books)) {
				if (book.title === title) {
					titleBooks.push(book);
				}
			}
			resolve(titleBooks);
		}, 6000);
	});
}


// public_users.get('/title/:title', function (req, res) {
// 	//Write your code here
// 	// return res.status(300).json({ message: "Yet to be implemented" });
// 	let titlebooks = [];
// 	for (let [key, book] of Object.entries(books)) {
// 		if (book.title === req.params.title) {
// 			titlebooks.push(book);
// 		}
// 	}
// 	if (titlebooks.length === 0) {
// 		return res.status(404).json({ message: "No books found" });
// 	}
// 	res.send(titlebooks);
// });

public_users.get('/title/:title', function (req, res) {
	getBooksByTitle(req.params.title).then((titlebooks) => {
		if (titlebooks.length === 0) {
			res.status(404).json({ message: "No books found" });
		}
		res.send(titlebooks);
	}).catch((err) => {
		res.status(404).json({ message: err });
	})
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
	//Write your code here
	// return res.status(300).json({ message: "Yet to be implemented" });
	let book = books[req.params.isbn];
	res.send(book.reviews);
});

module.exports.general = public_users;
