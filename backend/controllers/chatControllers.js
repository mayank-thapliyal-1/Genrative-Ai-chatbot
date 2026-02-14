import Chat from "../models/ChatSchema.js";
import { generateAIResponse } from "../services/Aiservice.js";
export const chatHandler = async (req, res) => {
  const { message, sessionId } = req.body;

  const aiReply = await generateAIResponse(message);

  let chat = await Chat.findOne({ sessionId });

  if (!chat) {
    chat = new Chat({ sessionId, messages: [] });
  }

  chat.messages.push({ role: "user", text: message });
  chat.messages.push({ role: "ai", text: aiReply });

  await chat.save();

  res.json({ reply: aiReply });
};

export const getHistory = async (req, res) => {
  const chat = await Chat.findOne({ sessionId: req.params.sessionId });
  res.json(chat?.messages || []);
};
export const getSessions = async (req, res) => {
  const chats = await Chat
    .find({}, "sessionId messages updatedAt")
    .sort({ updatedAt: -1 });

  const sessions = chats.map(chat => {
    const firstUserMsg = chat.messages.find(m => m.role === "user");

    return {
      sessionId: chat.sessionId,
      title: firstUserMsg
        ? firstUserMsg.text.slice(0, 40)
        : "New Chat",
      updatedAt: chat.updatedAt
    };
  });

  res.json(sessions);
};

