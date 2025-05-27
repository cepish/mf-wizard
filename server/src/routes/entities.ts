import express from "express";
import { entities } from "../data/entities";

const router = express.Router();

// GET /entities
router.get("/", (req, res) => {
  res.json(entities);
});

export default router;
