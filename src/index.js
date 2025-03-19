import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import rentRoutes from "./routes/rental.routes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

//Routes to check

app.get("/login", (req, res) => {
  res.send("Login route");
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/rent", rentRoutes);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
