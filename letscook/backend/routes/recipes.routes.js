import express from "express";
const router = express.Router();

router.get("/abcd", async (req, res) => {
    res.send({ message: "Hello from recipes route" });
});

export default router;