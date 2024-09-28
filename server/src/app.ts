import express from "express";
import cors from "cors";
import routes from "./routes";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

mongoose.connect(process.env.MONGODB_URL as string)

app.listen(4000, () => {
    console.log("Running on port 4000");
})