const mongoose = require("mongoose");

const BillboardStatus = {
  Available: "Available",
  Booked: "Booked",
};

const billboardSchema = new mongoose.Schema({
  location: String,
  size: String,
  perDayRate: Number,
  status: {
    type: String,
    enum: BillboardStatus,
    default: BillboardStatus.Available,
  },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Billboard = mongoose.model("Billboard", billboardSchema);

module.exports = Billboard;
