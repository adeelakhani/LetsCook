import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/recipes.routes.js';
import cors from "cors";


dotenv.config();
app.use(cors());

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/recipes",routes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});