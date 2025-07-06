import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/posts.routes.js';

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
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api",userRoutes);
app.use("/api",postRoutes);

app.get("/", (req, res) => {
   res.json({message: "Hello LetsCook enjoyer👋"});
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
