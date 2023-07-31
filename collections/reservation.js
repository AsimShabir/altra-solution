const mongoose = require("mongoose");
const reservatiinSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  rate: Number,
  billBoard: { type: mongoose.Schema.Types.ObjectId, ref: "Billboard" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  trackingId: String,
});
const Reservatiin = mongoose.model("Reservatiin", reservatiinSchema);
module.exports = Reservatiin;
