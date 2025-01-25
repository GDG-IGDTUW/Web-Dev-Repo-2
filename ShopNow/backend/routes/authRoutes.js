const express = require("express");
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// User Registration
router.post("/register-seller", AuthController.userRegistration);

// User Login
router.post("/login-seller", AuthController.userLogin);


// -- replace getAllUsers with your actual controller function --
module.exports = router;

