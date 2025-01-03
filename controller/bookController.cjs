const Book = require("../model/Book.cjs");

const getBooks = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (err) {
    console.error("Error in fetching the Books");
    res.status(500).json({ message: "Error" });
  }
};

const createBook = (req, res) => {
  const newBook = new Book({
    name: req.body.name,
    author: req.body.author,
    genre: req.body.genre,
    type: req.body.type,
  });

  newBook
    .save()
    .then(() => {
      res.send("Book Inserted Successfully");
    })
    .catch((err) => {
      console.log("error in inserting Book");
    });
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.body._id,
      { name: req.body.name },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found." });
    }
    res.status(200).json({ message: "Updated successfully.", updatedBook });
  } catch (err) {
    console.log("Error in updating:", err);
    res.status(500).json({ error: "Error occurred while updating the book." });
  }
};

module.exports = { getBooks, createBook , updateBook};
