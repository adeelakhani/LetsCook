import express from "express";
import { userProfile, userPrivate, getStats, createpost, getAllRecipes, getPostInfo, submitRecipe, test } from '../controllers/user.controllers.js';
const router = express.Router();
import multer from 'multer'

const upload = multer()


router.get("/userProfile/:username", userProfile);
router.get("/userPrivate/:id", userPrivate);
router.get("/getStats/:id", getStats)
router.post("/createpost/:id/:postId", upload.none(), createpost)
router.get("/test/:id/:postId", test)
router.get("/getAllRecipes", getAllRecipes)
router.get("/getPostInfo/:postId", getPostInfo);
router.post("/submitRecipe/:id/:postId", upload.none(), submitRecipe)




export default router;
