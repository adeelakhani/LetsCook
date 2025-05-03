import express from "express";
import { userProfile, userPrivate, getStats, createpost, getAllRecipes, getPostInfo, submitRecipe, submissions, approveSubmission, getSubmissionInfo, rejectSubmission, userCreations, userSubmissions, test } from '../controllers/user.controllers.js';
const router = express.Router();
import multer from 'multer'
import { sub } from "framer-motion/client";

const upload = multer()


router.get("/userProfile/:username", userProfile);
router.get("/userPrivate/:id", userPrivate);
router.get("/getStats/:id", getStats)
router.post("/createpost/:id/:postId", upload.none(), createpost);
router.get("/getAllRecipes", getAllRecipes);
router.get("/getPostInfo/:postId", getPostInfo);
router.post("/submitRecipe/:id/:postUserId/:postId/:submissionId", upload.none(), submitRecipe);
router.get("/submissions/:id", submissions);
router.get("/getSubmissionInfo/:submissionId", getSubmissionInfo);
router.post("/approveSubmission/:id", approveSubmission);
router.patch("/rejectSubmission/:id", rejectSubmission);
router.get("/userCreations/:id", userCreations);
router.get("/userSubmissions/:id", userSubmissions);

router.get("/test/:id/:postId/:submissionId", test);

export default router;
