const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const incidentRoutes = require("./routes/incident"); 
const roomRoutes = require("./routes/roomRoutes");
const guestRoutes = require("./routes/guestRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const emergencyRoutes = require('./routes/emergencyRoutes');


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes); 
app.use("/rooms", roomRoutes);
app.use("/guests", guestRoutes);
app.use("/resources", resourceRoutes);
app.use('/api/emergency', emergencyRoutes);





// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
