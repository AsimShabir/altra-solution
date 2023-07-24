const express = require("express");
const router = express.Router();
const user = require("../controller/userController");
const billboard = require("../controller/billBoardController");

router
  .post("/createuser", user.createUser)
  .get("/getallusers", user.getAllUsers)
  .post("/createbillboard", billboard.createBillboard)
  .get("/getallbillboard", billboard.getAllBillboards);
module.exports = router;
