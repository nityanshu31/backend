const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  status: { type: String, enum: ["Checked-in", "Checked-out"], default: "Checked-in" },
  timeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Guest", guestSchema);
