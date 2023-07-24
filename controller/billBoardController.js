const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const Billboard = require("../collections/billboard");
const User = require("../collections/user");

const createBillboard = async (req, res) => {
  try {
    const { location, size, perDayRate, status, image, userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found."); // Handle case when the user does not exist
    }
    if (user) {
      const billboard = await Billboard.create({
        location,
        size,
        perDayRate,
        status,
        image,
        user: user.id,
      });
      res.send(billboard);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const getAllBillboards = async (req, res) => {
  try {
    Billboard.find({}).then((result) => {
      res.status(200).send(result);
    });
  } catch (e) {
    res.send(e);
  }
};

module.exports = {
  createBillboard,
  getAllBillboards,
};
