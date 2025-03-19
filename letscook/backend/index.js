import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/user.routes.js';
import cors from "cors";




dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;
// const corsOptions = {
//     origin: 'http://localhost:3000',
//     creditionals: true,
//     allowHeaders: 'Content-Type', 'Authorization'
// }
app.use(cors());
app.use(express.json());


app.use("/api",routes);
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
