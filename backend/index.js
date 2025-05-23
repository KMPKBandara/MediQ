import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("Api is working");
});

//middleware
app.use(express.json());
app.use(cookieparser());
app.use(cors(corsOptions));

app.listen(port, () => {
  console.log("Server is running on port" + port);
});
