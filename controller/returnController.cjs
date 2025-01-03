const Return = require("../model/Return.cjs");
const Borrow = require("../model/Borrow.cjs");


const returnBook = async (req, res) => {
  const { username, bookid } = req.body;
  if (!username || !bookid) {
    return res.status(400).json({ error: "Username and Book ID are required." });
  }

  try {
    const borrowRecord = await Borrow.findOne({ username, bookid });
    if (!borrowRecord) {
      return res.status(404).json({ error: "Borrow record not found." });
    }

    const dueDate = borrowRecord.duedate;
    const fine = 100;

    const returnRecord = new Return({
      username,
      bookid,
      duedate: dueDate,
      fine,
    });

    await returnRecord.save();

    res.status(200).json({ message: "Book returned successfully.", returnRecord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while returning the book." });
  }
};

module.exports = { returnBook };