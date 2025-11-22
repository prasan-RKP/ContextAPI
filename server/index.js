import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routes/docs/note.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
//const MONGO_URL = process.env.MONGO_URL || 3008;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/note", router);

app.listen(PORT, ()=> {
    console.log("Server is running 🚀");
})
