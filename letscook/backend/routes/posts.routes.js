import express from "express";
import { createpost, getAllRecipes, getPostInfo, submitRecipe, submissions, approveSubmission, getSubmissionInfo, rejectSubmission, deletePost, deleteSubmission, test } from '../controllers/posts.controllers.js';
const router = express.Router();
import multer from 'multer'


const upload = multer()

router.post("/createpost/:id/:postId", upload.none(), createpost);
router.get("/getAllRecipes", getAllRecipes);
router.get("/getPostInfo/:postId", getPostInfo);
router.post("/submitRecipe/:id/:postUserId/:postId/:submissionId", upload.none(), submitRecipe);
router.get("/submissions/:id", submissions);
router.get("/getSubmissionInfo/:submissionId", getSubmissionInfo);
router.post("/approveSubmission/:id", approveSubmission);
router.patch("/rejectSubmission/:id", rejectSubmission);
router.delete("/deletePost/:userId/:id", deletePost);
router.delete("/deleteSubmission/:submittor/:postId/:id", deleteSubmission);

router.get("/test/:id/:postId/:submissionId", test);

export default router;
