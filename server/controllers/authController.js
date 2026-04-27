import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role === "admin" ? "admin" : "user"
  });

  res.status(201).json({
    token: generateToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    token: generateToken(user),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});
