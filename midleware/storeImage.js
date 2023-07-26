const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const serverImagePath = "http://localhost:4000/uploads/";

const storeImage = async (req, res, next) => {
  try {
    const imageData = req.body.image;
    const imageBuffer = Buffer.from(
      imageData.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const imageExtension = imageData.split(";")[0].split("/")[1];
    const imageName = `${uuidv4()}.${imageExtension}`;
    const imagePath = path.join(__dirname, "../uploads", imageName);
    const uploadDir = path.join(__dirname, "../uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    fs.writeFileSync(imagePath, imageBuffer, (err) => {
      if (err) {
        console.error("Error saving image:", err);
        return res
          .status(500)
          .json({ success: false, message: "Failed to save the image." });
      }
    });
    req.imagePath = serverImagePath + imageName;
    next();
  } catch (e) {
    return res.status(401).send("Access denied. No token provided.");
  }
};
module.exports = {
  storeImage,
};
