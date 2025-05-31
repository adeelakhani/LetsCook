import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js';
import postRoutes from './routes/posts.routes.js';

import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const corsURL = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(cors({
   origin: corsURL,
   credentials: true,
 }));
 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api",userRoutes);
app.use("/api",postRoutes);

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
