import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import express from "express";
import router from "./routes/chat.route.js"
const app = express();
const Port =8000;
app.use(cors(
 { origin:"https://genrative-ai-chatbot-tas2.vercel.app/",}
));
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
app.use("/api",router)
app.listen(Port, () => console.log("Server running"));
