import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

import indexRouter from "./routes/index.js";
import urlsRouter from "./routes/urls.js";

const app = express();

// connect to DB
connectDB();

// Body parser (built-in to Express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/", indexRouter);
app.use("/api", urlsRouter);

// Server start
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});