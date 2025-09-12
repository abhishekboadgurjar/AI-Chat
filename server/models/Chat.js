const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  messages: [
    {
      role: { type: String, enum: ["user", "ai"], required: true },
      text: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Chat", chatSchema);
