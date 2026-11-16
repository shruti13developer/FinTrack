
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();


const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://fin-track-xi-two.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
}));


app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to FinTrack API!",
    status: "Backend is running successfully",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`FinTrack server running on port ${PORT}`);
  });
};

startServer();
