const express = require('express');
const EmergencyRequest = require('../models/EmergencyRequest');

const router = express.Router();

// Create Emergency Request
router.post('/', async (req, res) => {
  try {
    const { fullName, contact, email, address, location, emergencyType, description, urgency } = req.body;

    // ✅ Validate required fields
    if (!fullName || !contact || !email || !address || !location || !emergencyType || !description || !urgency) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log("Received Data:", req.body); // 🔍 Debugging log

    const newRequest = new EmergencyRequest({
      fullName,
      contact,
      email,
      address,
      location,  // 🔹 Ensure location is being received
      emergencyType,
      description,
      urgency
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ message: 'Emergency request saved successfully', data: savedRequest });
  } catch (error) {
    console.error("Error saving request:", error);
    res.status(500).json({ message: 'Error saving request', error });
  }
});

// Get All Emergency Requests
router.get('/', async (req, res) => {
  try {
    const requests = await EmergencyRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: 'Error fetching requests', error });
  }
});

module.exports = router;
