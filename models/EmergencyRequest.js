const mongoose = require('mongoose');

const EmergencyRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: String, required: true },  // 🔹 Ensure location is stored
  emergencyType: { type: String, required: true },
  description: { type: String, required: true },
  urgency: { type: String, required: true, enum: ['Low', 'Medium', 'High', 'Critical'] }
}, { timestamps: true });

module.exports = mongoose.model('EmergencyRequest', EmergencyRequestSchema);
