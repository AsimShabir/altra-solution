const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    const decode = jwt.verify(token, "limt");
    console.log({ decode });
    if (!decode) {
      return res.status(401).send("Access denied. Invalid token.");
    }
    next();
    // decode ? next() : res.status(401).send("Access denied. No token provided.");
  } catch (e) {
    return res.status(401).send("Access denied. No token provided.");
  }
};
module.exports = {
  auth,
};
