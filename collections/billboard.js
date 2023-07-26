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
  image: {
    data: Buffer, // Buffer to store the image data
    contentType: String, // MIME type of the image
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Billboard = mongoose.model("Billboard", billboardSchema);

module.exports = Billboard;
