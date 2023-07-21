const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const User = require("../collections/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { name, password, phone, email, status, role } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      password: hashPassword,
      phone,
      email,
      status,
      role,
    });
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "User not found." });
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .send({ success: false, message: "Invalid password." });
    if (user) {
      let jwtSecretKey = "limt";
      const token = jwt.sign(user.name, jwtSecretKey);
      return res.status(200).send(token);
    }
  } catch (e) {
    res.send(e);
  }
};

const getAllUsers = async (req, res) => {
  try {
    User.find({}).then((result) => {
      res.status(200).send(result);
    });
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  createUser,
  login,
  getAllUsers,
};