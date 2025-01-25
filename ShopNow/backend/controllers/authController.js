const authModel = require("../models/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthController {
  // **User Registration**
  static userRegistration = async (req, res) => {
    console.log("Registration request received:", req.body);
    const { username, email, password } = req.body;

    try {
      // Validate input
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user exists
      const existingUser = await authModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists. Please log in." });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save new user
      const newUser = new authModel({ username, email, password: hashedPassword });
      const savedUser = await newUser.save();

      return res.status(201).json({
        message: "User registered successfully",
        user: { id: savedUser._id, username: savedUser.username, email: savedUser.email },
      });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // **User Login**
  static userLogin = async (req, res) => {
    console.log("Login request received:", req.body);
    const { email, password } = req.body;

    try {
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Find user
      const user = await authModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User does not exist. Please register." });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials. Please try again." });
      }

      // Generate token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      return res
        .status(200)
        .header("auth-token", token)
        .json({ message: "Login successful", token, username: user.username });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = AuthController;

