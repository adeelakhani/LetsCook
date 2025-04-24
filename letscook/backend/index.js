import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/user.routes.js';
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
   origin: "http://localhost:3000",
   credentials: true,
 }));
 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api",routes);
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
