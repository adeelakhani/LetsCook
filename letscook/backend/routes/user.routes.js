import express from "express";
import { userProfile, userPrivate, getStats, createpost, getAllRecipes, getPostInfo, submitRecipe, test } from '../controllers/user.controllers.js';
const router = express.Router();
import multer from 'multer'

const upload = multer()


router.get("/userProfile/:username", userProfile);
router.get("/userPrivate/:id", userPrivate);
router.get("/getStats/:id", getStats)
router.post("/createpost/:id/:postId", upload.none(), createpost)
router.get("/getAllRecipes", getAllRecipes)
router.get("/getPostInfo/:postId", getPostInfo);
router.post("/submitRecipe/:id/:postUserId/:postId/:submissionId", upload.none(), submitRecipe)
router.get("/test/:id/:postId/:submissionId", test)




export default router;
