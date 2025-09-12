const Chat = require("../models/Chat");
const geminiService = require("../utils/geminiService");

// Ask Gemini API
exports.askGemini = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    // call Gemini API
    const aiResponse = await geminiService.getAIResponse(message);

    // find or create chat for this user
    let chat = await Chat.findOne({ userId });
    if (!chat) {
      chat = new Chat({ userId, messages: [] }); // ✅ use messages (plural)
    }

    // push both user & AI messages
    chat.messages.push({ role: "user", text: message });
    chat.messages.push({ role: "ai", text: aiResponse });
    await chat.save();

    res.json({ reply: aiResponse });
  } catch (error) {
    res.status(500).json({ msg: "Chat error", error: error.message });
  }
};

// Get Chat History
exports.getHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const chat = await Chat.findOne({ userId });
    res.json(chat ? chat.messages : []); 
  } catch (error) {
    res.status(500).json({ msg: "History error", error: error.message });
  }
};
