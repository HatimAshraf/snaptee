import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

//routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  // If it's an ApiError (check for statusCode property which is unique to ApiError)
  if (err.statusCode && err.success === false) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors || [],
      data: err.data || null,
    });
  }

  // For other errors, send generic error response
  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [],
    data: null,
  });
});

export { app };
