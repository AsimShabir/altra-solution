const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const Reservatiin = require("../collections/reservation");
const Billboard = require("../collections/billboard");
const User = require("../collections/user");

const BillboardStatus = {
  Available: "Available",
  Booked: "Booked",
};
const reservation = async (req, res) => {
  try {
    const { startDate, endDate, rate, userId, billboardId } = req.body;
    const user = await User.findById(userId);
    const billBoard = await Billboard.findById(billboardId);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found." });
    }
    if (!billBoard) {
      return res
        .status(404)
        .send({ success: false, message: "Billboard not found." });
    }
    const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();
    const differenceInMilliseconds = endDateTime - startDateTime;
    const daysBetween = Math.round(differenceInMilliseconds / oneDay) + 1;
    const totalRate = billBoard.perDayRate * daysBetween;

    if (user && billBoard) {
      await Reservatiin.create({
        startDate,
        endDate,
        rate: totalRate,
        billBoard: billBoard.id,
        user: user.id,
      });
      await Billboard.updateOne(
        { _id: billBoard.id },
        { $set: { status: BillboardStatus.Booked } }
      );

      res.send("Bill board reserved");
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const getAllReservationsWithUser = async (req, res) => {
  try {
    const reservations = await Reservatiin.find({})
      .populate("user")
      .populate("billBoard");

    res.status(200).send(reservations);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  reservation,
  getAllReservationsWithUser,
};
