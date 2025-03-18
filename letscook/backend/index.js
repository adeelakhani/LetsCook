import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import cors from "cors";




dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());


app.use("/api",routes);
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
