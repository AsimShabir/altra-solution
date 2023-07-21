const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const user = require("./controller/userController");
const billboard = require("./controller/billBoardController");

mongoose
  .connect("mongodb://localhost:27017/altra-solution", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection successfully"))
  .catch((err) => console.log(err));

app.post("/createuser", user.createUser);
app.post("/login", user.login);
app.get("/getallusers", user.getAllUsers);
app.post("/createbillboard", billboard.createBillboard);
app.get("/getallbillboard", billboard.getAllBillboards);

app.listen(4000, () => {
  console.log("server is runing on port 4000");
});
