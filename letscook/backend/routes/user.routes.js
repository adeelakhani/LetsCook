import express from "express";
import { userProfile } from '../controllers/user.controllers.js';
const router = express.Router();

router.get("/userProfile", userProfile);

export default router;
