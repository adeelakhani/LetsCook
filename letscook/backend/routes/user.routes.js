import express from "express";
import { userProfile, userPrivate, getStats, createpost } from '../controllers/user.controllers.js';
import multer from 'multer';
const router = express.Router();


const upload = multer({ 
    storage: multer.memoryStorage(), // Store files in memory if you're using Supabase
    limits: {
      fileSize: 10 * 1024 * 1024 // 10MB file size limit
    }
  });

router.get("/userProfile/:username", userProfile);
router.get("/userPrivate/:id", userPrivate);
router.get("/getStats/:id", getStats)
router.post("/createpost/:id", upload.array('images', 10), createpost)


export default router;
