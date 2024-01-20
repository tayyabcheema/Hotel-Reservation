const User = require("../models/User");

// Update a user

const updateUser = async (req, res, next) => {
  try {
    let updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete a User

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

// Get One User

const getOneUser = async (req, res, next) => {
  try {
    let getUser = await User.findById(req.params.id);
    res.status(200).json(getUser);
  } catch (err) {
    next(err);
  }
};

// Get ALL Users

const getAllUsers = async (req, res, next) => {
  try {
    let allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};




module.exports = {
  updateUser,
  deleteUser,
  getOneUser,
  getAllUsers,
};
