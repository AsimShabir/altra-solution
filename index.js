const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const RouteIndex = require("./routes/index");
const midleware = require("./midleware/auth");
const user = require("./controller/userController");
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/api", midleware.auth, RouteIndex);
app.post("/login", user.login);
app.post("/createuser", user.createUser);

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
