import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import express from "express";
import router from "./routes/Chat.Route.js"
const app = express();
const Port =8000;
app.use(cors());
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
