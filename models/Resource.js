const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  threshold: { type: Number, required: true },
  allocatedTo: { type: String, default: "" },
});

module.exports = mongoose.model("Resource", resourceSchema);
