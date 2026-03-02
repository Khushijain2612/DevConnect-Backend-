const express = require("express");
const router = express.Router();
const { getMyProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getMyProfile);
// console.log(protect);
// console.log(getMyProfile);
module.exports = router;