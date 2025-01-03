const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema({
  username: { type: String, required: true },
  bookid: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  duedate: { type: Date, required: true },
  fine: { type: Number, required: true },
}, { timestamps: true });

const Return = mongoose.model("Return", returnSchema);

module.exports = Return;
