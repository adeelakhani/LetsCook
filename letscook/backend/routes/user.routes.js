import express from "express";
import { userProfile, userPrivate, getStats } from '../controllers/user.controllers.js';
const router = express.Router();

router.get("/userProfile/:id", userProfile);
router.get("/userPrivate/:id", userPrivate);
router.get("/getStats/:id", getStats)

export default router;
