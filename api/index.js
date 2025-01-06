import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

//? Routes:
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
}

//? listen on port:
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});

//? Middleware for error handling:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
