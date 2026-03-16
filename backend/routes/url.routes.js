import express from "express";
import { createShortUrl, redirectToOriginal } from "../controllers/url.controllers.js";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortCode", redirectToOriginal);

export default router;