const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { setBudget } = require("../controllers/budgetController");

// POST request to set monthly budget
router.post("/set", protect, setBudget);

module.exports = router;
