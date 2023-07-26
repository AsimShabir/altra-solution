const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const billboard = require("../controller/billBoardController");
const midleware = require("../midleware/storeImage");

const reservation = require("../controller/reservationController");

router
  .get("/getallusers", user.getAllUsers)
  .post("/createbillboard", midleware.storeImage, billboard.createBillboard)
  .get("/getallbillboard", billboard.getAllBillboards)
  .post("/reservation", reservation.reservation);

module.exports = router;
