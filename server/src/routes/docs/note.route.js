import express from "express";

const router = express.Router();

router.get("/hello", (req, res) => {
  res.send("Hello route is working perfectly");
});

export default router;