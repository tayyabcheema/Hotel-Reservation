const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken");
const verifyUser = require("../utils/verifyToken");
const {
  updateUser,
  deleteUser,
  getOneUser,
  getAllUsers,
} = require("../controllers/user");
const verifyAdmin = require("../utils/verifyToken");

// Middleware for the authentication of the token

// router.get("/checkauth", verifyToken , (req,res,next)=>{
//   res.send( "Hello user you are logged in! ")
// })

// // Middleware for the authentication of the User

// router.get("/checkuser/:id", verifyUser , (req,res,next)=>{
//   res.send( "Hello user you are logged in and you can delete your account ")
// })

// // Middleware for the authentiaction of the Admin

// router.get("/checkadmin/:id", verifyAdmin , (req,res,next)=>{
//   res.send( "Hello Admin you are logged in and you can delete all account ")
// })

// UPDATE

router.put("/:id", updateUser);

// DELETE

router.delete("/:id", verifyUser, deleteUser);

// GET 1 Hotel

router.get("/:id", verifyUser, getOneUser);

// GET ALL HOTELS

router.get("/", verifyAdmin, getAllUsers);

module.exports = router;
