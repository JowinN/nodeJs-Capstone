const Book = require("../model/Book.cjs");

const getBooks = async (req,res)=>{
    try {
        const book = await Book.find();
        res.status(200).json(book);
      } catch (err) {
        console.error("Error in fetching the Books");
        res.status(500).json({ message: "Error" });
      }
}

const createBook = (req,res)=>{
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
}

module.exports = { getBooks, createBook};