import express from "express";
import { userProfile, userPrivate, getStats, userCreations, userSubmissions, getUsersByRank } from '../controllers/user.controllers.js';
const router = express.Router();

router.get("/userProfile/:username", userProfile);
router.get("/userPrivate/:id", userPrivate);
router.get("/getStats/:id", getStats)
router.get("/getUsersByRank", getUsersByRank);
router.get("/userCreations/:id", userCreations);
router.get("/userSubmissions/:id", userSubmissions);

export default router;
