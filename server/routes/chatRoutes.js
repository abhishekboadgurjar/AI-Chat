const express = require("express");
const router = express.Router();
const { askGemini, getHistory } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/ask", authMiddleware, askGemini);
router.get("/history", authMiddleware, getHistory);

module.exports = router;
