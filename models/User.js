const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["User/Volunteer", "Organization"], default: "User/Volunteer" },
  email: { type: String },
  address: { type: String },
  profilePicture: { type: String }, // Image URL
  bloodGroup: { type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
  emergencyContact: { 
    name: { type: String },
    phone: { type: String },
    relation: { type: String }
  },
  medicalConditions: { type: String },
  allergies: { type: String },
  medications: { type: String }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
