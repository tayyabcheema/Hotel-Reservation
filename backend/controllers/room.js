const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const createError = require("../utils/error");

// API for creating a new Room

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const updatesRoom = async (req, res, next) => {
  try {
    let updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (err) {
    next(err);
  }
};

// Update Room Avaialabilty dates
const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {$push:{ "roomNumbers.$.unavailableDates": req.body.dates }}
    );
    res.status(200).json("Room status has been updated")
  } catch (err) {
    next(err);
  }
};

// Delete a Hotel

const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};

// Get One Hotel

const getOneRoom = async (req, res, next) => {
  try {
    let getRoom = await Room.findById(req.params.id);
    res.status(200).json(getRoom);
  } catch (err) {
    next(err);
  }
};

// Get ALL Hotels

const getAllRooms = async (req, res, next) => {
  try {
    let allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (err) {
    next(err); // res.status(500).json(error);
  }
};

module.exports = {
  createRoom,
  updatesRoom,
  deleteRoom,
  getOneRoom,
  getAllRooms,
  updateRoomAvailability
};
