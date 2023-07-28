const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" })); // Set the limit for JSON payloads
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" })); // Set the limit for URL-encoded payloads

const RouteIndex = require("./routes/index");
const midleware = require("./midleware/auth");
const user = require("./controller/userController");
const billboard = require("./controller/billBoardController");
const path = require("path");

app.use("/api", midleware.auth, RouteIndex);
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.post("/login", user.login);
app.post("/createuser", user.createUser);
app.post("/getallpublicbillboard", billboard.getAllPublicBillboards);

mongoose
  .connect("mongodb://localhost:27017/altra-solution", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection successfully"))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("server is runing on port 4000");
});
