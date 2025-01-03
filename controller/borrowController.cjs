const Borrow = require("../model/Borrow.cjs"); 
const Book = require("../model/Book.cjs");

const borrowBook = async (req, res) => {
  const { username, bookid } = req.body;

  if (!username || !bookid) {
    return res.status(400).json({ error: "Username and Book ID are required." });
  }

  try {
    const book = await Book.findById(bookid);
    if (!book) {
      return res.status(404).json({ error: "Book not found." });
    }
    if (!book.available) {
      return res.status(400).json({ error: "Book is not available for borrowing." });
    }
    const borrow = new Borrow({
      username,
      bookid,
    });

    await borrow.save();

    res.status(200).json({ message: "Book borrowed successfully.", borrow});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while borrowing the book." });
  }
};

module.exports = { borrowBook };
