const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const Billboard = require("../collections/billboard");

const createBillboard = async (req, res) => {
  try {
    const { location, size, perDayRate, status, image } = req.body;
    const billboard = await Billboard.create({
      location,
      size,
      perDayRate,
      status,
      image,
    });
    res.send(billboard);
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
