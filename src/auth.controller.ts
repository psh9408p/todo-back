import express from "express";
import { registerUser, loginUser } from "./auth.service";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await registerUser(email, password);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: (err as Error).message });
  }
});

export default router;
