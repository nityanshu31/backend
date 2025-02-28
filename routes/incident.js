const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");

// @route   POST /api/incidents
// @desc    Create a new incident
router.post("/", async (req, res) => {
  try {
    const { title, description, type, location } = req.body;

    if (!title || !description || !type || !location || !location.lat || !location.lng) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncident = new Incident({ title, description, type, location });
    await newIncident.save();

    res.status(201).json(newIncident);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   GET /api/incidents
// @desc    Get all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   GET /api/incidents/:id
// @desc    Get a single incident by ID
router.get("/:id", async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.json(incident);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   PUT /api/incidents/:id
// @desc    Update an incident's status (e.g., marking it as solved)
router.put("/:id", async (req, res) => {
  try {
    const { solved } = req.body;

    // Validate the status update
    if (typeof solved !== 'boolean') {
      return res.status(400).json({ message: "Solved status must be a boolean" });
    }

    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { solved },
      { new: true } // Return the updated incident
    );

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json(incident); // Return the updated incident
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route   DELETE /api/incidents/:id
// @desc    Delete an incident
router.delete("/:id", async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    res.json({ message: "Incident deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
