const express = require("express");
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');
const { getHistory }= require('../controllers/historyController.js');

router.get("/", protect, getHistory);

module.exports = router;