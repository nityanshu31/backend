const express = require("express");
const Resource = require("../models/Resource");

const router = express.Router();

// Add a new resource
router.post("/", async (req, res) => {
  try {
    const { name, category, stock, threshold } = req.body;
    const newResource = new Resource({ name, category, stock, threshold, allocatedTo: "" });
    await newResource.save();
    res.status(201).json({ message: "Resource added successfully", resource: newResource });
  } catch (error) {
    res.status(500).json({ message: "Error adding resource", error });
  }
});

// Get all resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resources", error });
  }
});

// Allocate a resource
// Allocate a resource
router.put("/:id/allocate", async (req, res) => {
  try {
    const { user } = req.body; // Get the user to allocate
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    resource.allocatedTo = user;
    await resource.save();
    res.json({ message: "Resource allocated successfully", resource });
  } catch (error) {
    res.status(500).json({ message: "Error allocating resource", error });
  }
});

// Delete a resource
router.delete("/:id", async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });

    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting resource", error });
  }
});

module.exports = router;
