const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const Billboard = require("../collections/billboard");
const User = require("../collections/user");

const createBillboard = async (req, res) => {
  try {
    const { name, description, location, size, perDayRate, status, userId } =
      req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found." });
    }
    if (user) {
      const billboard = await Billboard.create({
        name,
        description,
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
      query = { location: { $regex: location, $options: "i" } };
    }
    const billboards = await Billboard.find(query).populate("user");
    res.status(200).send(billboards);
  } catch (e) {
    res.status(500).send(e);
  }
};
const getAllPublicBillboards = async (req, res) => {
  try {
    const { location } = req.body;
    let query = { status: "Available" }; // Initialize the query object with status "Available"

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const billboards = await Billboard.find(query)
      .populate({
        path: "user",
        match: { status: "Approved", role: "Admin" },
      })
      .exec();
    // Filter the results to include only billboards with matching users
    const filteredBillboards = billboards.filter(
      (billboard) => billboard.user !== null
    );
    res.status(200).send(filteredBillboards);
  } catch (e) {
    res.status(500).send(e);
  }
};
const updateBillboard = async (req, res) => {
  const { _id, name, description, location, size, perDayRate, status } =
    req.body;

  console.log({ _id, name, description, location, size, perDayRate, status });
  Billboard.updateOne(
    { _id },
    {
      name,
      description,
      location,
      size,
      perDayRate,
      status,
      image: req.imagePath,
    }
  ).then((error, result) => {
    console.log({ error, result });
    res.send("Billboard Updated");
  });
};

module.exports = {
  createBillboard,
  getAllBillboards,
  getAllPublicBillboards,
  updateBillboard,
};
