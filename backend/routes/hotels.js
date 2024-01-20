const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");
const createError = require("../utils/error");
const verifyAdmin = require("../utils/verifyToken")
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getOneHotel,
  getAllHotels,
  countByCity,
  countByType,
  getHotelRooms
} = require("../controllers/hotel");

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE

router.put("/:id", verifyAdmin, updateHotel);

// DELETE

router.delete("/:id", verifyAdmin, deleteHotel);

// GET 1 Hotel

router.get("/find/:id", getOneHotel);

// GET ALL HOTELS

router.get("/", getAllHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.exports = router;
