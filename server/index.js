import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routes/docs/note.route.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/note", router);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Successfully connected to DB ✅");

    app.listen(PORT, () => {
      console.log("Server is running 🚀");
    });
  })
  .catch((err) => {
    console.log("❌ Failed to connected to DB", err);
    process.exit(1);
  });
