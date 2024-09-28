import express from "express";
import cors from "cors";
import school from "./routes/school";
import map from "./routes/map"
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL as string)

app.use("/", school);
app.use("/map", map);