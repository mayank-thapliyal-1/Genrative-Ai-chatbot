import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import router from "./routes/chat.route.js";
const app = express();
const Port = 8000;
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.includes("vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("conneted sucess");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", router);
app.get("/api/env-check", (req, res) => {
  res.json({
    mongo: !!process.env.MONGO_URI,
    openai: !!process.env.GEMINI_API_KEY,
  });
});

app.get("/api/health", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ db: "connected" });
  } catch (e) {
    res.status(500).json({ db: "not connected", error: e.message });
  }
});

app.listen(Port, () => console.log("Server running"));
