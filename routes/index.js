import express from "express";
import Url from "../model/Url.js";

const router = express.Router();

router.get("/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    if (url) {
      // increment clicks atomically
      await Url.updateOne({ urlId: req.params.urlId }, { $inc: { clicks: 1 } });
      return res.redirect(url.origUrl);
    } else {
      return res.status(404).json("Not found");
    }
  } catch (err) {
    console.error("Redirect error:", err);
    return res.status(500).json("Server Error");
  }
});

export default router;