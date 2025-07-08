import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/posts.routes.js';
import rateLimit from 'express-rate-limit';

import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001 || 3002;

const allowedOrigins = ["http://localhost:3000"];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api",userRoutes);
app.use("/api",postRoutes);

app.get("/", (req, res) => {
   res.json({message: "Hello LetsCook v0.1 enjoyer👋"});
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Don't expose internal errors to clients
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: 'The requested resource was not found'
  });
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
