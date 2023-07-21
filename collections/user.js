const mongoose = require("mongoose");

const UserRole = {
  Admin: "Admin",
  User: "User",
  Administrator: "Administrator",
};
const UserStatus = {
  Approved: "Approved",
  DisApproved: "DisApproved",
};

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  status: {
    type: String,
    enum: UserStatus,
    default: UserStatus.DisApproved,
  },
  role: {
    type: String,
    enum: UserRole, // Enum with allowed values
    default: UserRole.User, // Default value if none provided
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
