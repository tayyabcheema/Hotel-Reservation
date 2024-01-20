const express = require('express')
const router = express.Router()
const verifyAdmin = require("../utils/verifyToken")
const {createRoom, updatesRoom, deleteRoom, getOneRoom, getAllRooms, updateRoomAvailability } = require("../controllers/room")

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE

router.put("/:id", verifyAdmin, updatesRoom);
router.put("/availability/:id",updateRoomAvailability);

// DELETE

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// GET 1 Hotel

router.get("/:id", getOneRoom);

// GET ALL HOTELS

router.get("/", getAllRooms);



module.exports=router