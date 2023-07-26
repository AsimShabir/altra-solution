const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const Billboard = require("../collections/billboard");
const User = require("../collections/user");
const Reservatiin = require("../collections/reservation");

const BillboardStatus = {
  Available: "Available",
  Booked: "Booked",
};
const createBillboard = async (req, res) => {
  try {
    const { location, size, perDayRate, status, userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found." });
    }
    if (user) {
      const billboard = await Billboard.create({
        location,
        size,
        perDayRate,
        status,
        image: req.imagePath,
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
    const { location } = req.body;
    let query = {};
    if (location) {
      query = { location: location };
    }
    const billboards = await Billboard.find(query);
    res.status(200).send(billboards);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  createBillboard,
  getAllBillboards,
};
