const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // valid for 1 hour
  });
};

//register user. This function should create a new user in the database and return a JWT token.
exports.registerUser = async (req, res) => {
  console.log("req.body:", req.body); // 👈 Add this temporarily
  // Destructure the request body to get user details
  const {fullname, email, password, profileImageUrl} = req.body || {};

  //Validation: check if all fields are provided
  if (!fullname || !email || !password) {
    return res.status(400).json({message: "All fields are required"});
  }

  try{
    //check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(400).json({message: "User already exists"});
    }

    const user = await User.create({
      fullname,
      email,
      password,
      profileImageUrl
    });

    //generate JWT token
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({message: "Error registering user", error: error.message});
  }

};

//login user. this function should verify the user's credentials and return a JWT token if valid.
exports.loginUser = async (req, res) => {
  const {email, password} = req.body || {};

  //Validation: check if all fields are provided
  if(!email || !password) {
    return res.status(400).json({message: "All fields are required"});
  }
  try{
    //check if user exists
    const user = await User.findOne({email});

    if(!user) {
      return res.status(400).json({message: "Invalid credentials"});
    }
    //password match
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  }catch(error) {
    res
    .status(500)
    .json({message: "Error logging in user", error: error.message});
  }
};

//get user info
//This function should verify the JWT token from the request headers and return user information if valid.
exports.getUserInfo = async (req, res) => {
  try{
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(400).json({message: "User not found"});
    }
    res.status(200).json(user);
  }catch (err){
    res
      .status(500)
      .json({message: "Error fetching user info", error: err.message});
  }
};
