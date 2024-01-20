const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const authUsers = require("./routes/users");
const authHotels = require("./routes/hotels");
const authRooms = require("./routes/rooms");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const PORT = process.env.PORT || 8000;
dotenv.config();

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Database connected successfully");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

// Creating cors middleware
app.use(cors())

// Creating middlewares for the API requests
app.use(cookieParser())
// Middleware for the API to parse data to database
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", authUsers);
app.use("/api/hotels", authHotels);
app.use("/api/rooms", authRooms);


// ERROR HANDLING MIDDLEWARE

app.use((err,req,res,next) =>{
  const errStatus = err.status || 500
  const errMessage = err.message || "Something went wrong"
  return res.status(errStatus).json({success: false, status: errStatus, message: errMessage, stack: err.stack})
})

app.listen(PORT, () => {
  Connect();
  console.log("Connected to backend");
});
