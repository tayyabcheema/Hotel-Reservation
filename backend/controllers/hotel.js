const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

// Create Hotel

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    let savedHotel = await newHotel.save(); //  savedHotel = savedHotel.toObject();
    res.status(200).json(savedHotel); // res.send(savedHotel)
  } catch (err) {
    next(err);
  }
};

// Update Hotels

const updateHotel = async (req, res, next) => {
  try {
    let updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};

// Delete a Hotel

const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (err) {
    next(err);
  }
};

// Get One Hotel

const getOneHotel = async (req, res, next) => {
  try {
    let getHotel = await Hotel.findById(req.params.id);
    res.status(200).json(getHotel);
  } catch (err) {
    next(err);
  }
};

// Get ALL Hotels

const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    let allHotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max | 10000000 },
    }).limit(4);
    res.status(200).json(allHotels);
  } catch (err) {
    next(err); // res.status(500).json(error);
  }
};

// Fliter using count by city

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    // let allHotels = await Hotel.find();
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err); // res.status(500).json(error);
  }
};

// Filter using Type

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villas" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      {
        type: "hotel",
        count: hotelCount,
      },
      {
        type: "apartment",
        count: apartmentCount,
      },
      {
        type: "resort",
        count: resortCount,
      },
      {
        type: "villas",
        count: villaCount,
      },
      {
        type: "cabin",
        count: cabinCount,
      },
    ]);
  } catch (err) {
    next(err);
  }
};

const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getOneHotel,
  getAllHotels,
  countByCity,
  countByType,
  getHotelRooms,
};
