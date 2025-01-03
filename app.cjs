
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authRouter.cjs");
const bookRoutes = require("./Routes/bookRouter.cjs");
const borrowRoutes = require("./Routes/borrowRouter.cjs");
const returnRoutes = require("./Routes/returnRouter.cjs");
// require("dotenv").config();

const app = express();

app.use(express.json());

// const mongoURI = process.env.MONGO_URI;
const MONGO_URI = "mongodb://127.0.0.1:27017/LibraryDB";
mongoose.connect(MONGO_URI)
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.use("/auth", authRoutes);
app.use("/book", bookRoutes);
app.use("/borrow", borrowRoutes);
app.use("/return", returnRoutes);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
