const express = require("express");
const Room = require("../models/Room");

const router = express.Router();

// Get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Add a new room
router.post("/", async (req, res) => {
  try {
    const { name, location, capacity } = req.body;
    const newRoom = new Room({ name, location, capacity, occupied: 0 });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: "Error adding room" });
  }
});

// Delete a room
router.delete("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (room.occupied > 0)
      return res.status(400).json({ error: "Cannot delete room with guests" });

    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
