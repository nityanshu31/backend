const express = require("express");
const mongoose = require("mongoose");
const Guest = require("../models/Guest");
const Room = require("../models/Room");

const router = express.Router();

// Get all guests
router.get("/", async (req, res, next) => {
  try {
    const guests = await Guest.find()
      .populate("roomId", "name location capacity occupied")
      .select("name roomId status timeStamp");
    res.json(guests);
  } catch (error) {
    next(error);
  }
});

// Add a new guest (hub removed)
router.post("/", async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    console.log("Incoming request:", req.body);

    const { name, roomId, status = "Checked-in", timeStamp } = req.body;

    if (!name || !roomId) {
      throw new Error("Name and roomId are required.");
    }

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      throw new Error("Invalid roomId format.");
    }

    const room = await Room.findById(roomId).session(session);
    if (!room) {
      throw new Error("Room not found.");
    }

    if (room.occupied >= room.capacity) {
      throw new Error("Room is at full capacity.");
    }

    const newGuest = new Guest({
      name: name.trim(),
      roomId,
      status,
      timeStamp: timeStamp || new Date().toISOString(),
    });

    await newGuest.save({ session });

    // Update room occupancy
    room.occupied += 1;
    await room.save({ session });

    await session.commitTransaction();
    session.endSession();

    console.log("Guest added successfully:", newGuest);
    res.status(201).json(newGuest);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
});

// Remove a guest
router.delete("/:id", async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid guest ID format.");
    }

    const guest = await Guest.findById(id).session(session);
    if (!guest) {
      throw new Error("Guest not found.");
    }

    const room = await Room.findById(guest.roomId).session(session);
    if (room) {
      room.occupied = Math.max(room.occupied - 1, 0);
      await room.save({ session });
    }

    await Guest.findByIdAndDelete(id, { session });

    await session.commitTransaction();
    session.endSession();

    console.log("Guest removed:", guest);
    res.json({ message: "Guest removed successfully." });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
});

// Global error handler
router.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

module.exports = router;
