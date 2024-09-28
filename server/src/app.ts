import express from "express";
import cors from "cors";
import router from "./routes/school";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL as string)

app.use("/", router);