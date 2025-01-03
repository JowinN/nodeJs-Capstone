const User = require("../model/User.cjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, username, password, mobile, email } = req.body;
    if (!name || !username || !password || !mobile || !email) {
      return res.status(400).json({ message: "Validation error: All fields are required." });
    }
    const existingUser = await User.findOne({ username });  // Check if username exists
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this username." });
    }

    const newUser = new User({ name, username, password, mobile, email });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id, username: savedUser.username },
      "secretkey",
      { expiresIn: "5h" }
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        userId: savedUser._id,
        username: savedUser.username,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const authUser = async (req, res) => {
  try {
    const { username, password } = req.body;  // Use username and password for authentication
    if (!username || !password) {
      return res.status(400).json({ message: "Validation error: Username and password are required." });
    }
    const user = await User.findOne({ username });  // Find user by username
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const isPasswordValid = (user.password === password);  // Check if password is correct
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "secretkey",
      { expiresIn: "5h" }
    );
    return res.status(200).json({
      success: true,
      message: "Authentication successful.",
      data: {
        userId: user._id,
        username: user.username,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { registerUser, authUser };
