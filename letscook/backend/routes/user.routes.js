import express from "express";
import { userProfile, userPrivate } from '../controllers/user.controllers.js';
const router = express.Router();

router.get("/userProfile/:id", userProfile);
router.get("/userPrivate/:id", userPrivate);

export default router;
