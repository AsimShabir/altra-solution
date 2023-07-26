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
    console.log({ user });
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "User not found." });
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .send({ success: false, message: "Invalid password." });
    if (user.status === "Approved") {
      let jwtSecretKey = "limt";
      const token = jwt.sign(
        { id: user.id, name: user.name, role: user.role },
        jwtSecretKey
      );
      return res.status(200).send(token);
    } else {
      return res.status(401).send("User not aproved.");
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
const removeUser = async (req, res) => {
  const { id } = req.body;
  User.deleteOne({ _id: id }).then((error, result) => {
    res.send("User deleted");
  });
};

const updateUser = async (req, res) => {
  const { id, name, password, phone, email, status, role } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  User.updateOne(
    { _id: id },
    { name, password: hashPassword, phone, email, status, role }
  ).then((error, result) => {
    res.send("User Updated");
  });
};

module.exports = {
  createUser,
  login,
  getAllUsers,
  removeUser,
  updateUser,
};
