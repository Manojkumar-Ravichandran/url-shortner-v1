import express from "express";
import { nanoid } from "nanoid";
import { validateUrl } from "../utils/utils.js";
import dotenv from "dotenv";
import Url from "../model/Url.js";
dotenv.config({ path: "./config/.env" });

const router = express.Router();

// Short URL Generator
router.post("/short", async (req, res) => {
  const { origUrl } = req.body;
  const base = process.env.BASE;

  if (!origUrl) return res.status(400).json({ error: "origUrl is required" });

  const urlId = nanoid(); // default length, or nanoid(8)
  if (validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        return res.json(url);
      } else {
        const shortUrl = `${base.replace(/\/$/, "")}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        return res.json(url);
      }
    } catch (err) {
      console.error("Error creating short URL:", err);
      return res.status(500).json("Server Error");
    }
  } else {
    return res.status(400).json("Invalid Original Url");
  }
});

export default router;