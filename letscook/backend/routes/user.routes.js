import express from "express";
import { thisUser, users } from '../controllers/user.controllers.js';
const router = express.Router();

router.get("/thisUser", thisUser);
router.get("/users", users);

export default router;
