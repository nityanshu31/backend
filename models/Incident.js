const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  solved: { type: Boolean, default: false }, // Added solved field
});

module.exports = mongoose.model("Incident", incidentSchema);
