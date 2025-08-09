// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import shortid from "shortid";
import Url from "./models/Url.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/urlshortener")
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.post("/api/shorten", async (req, res) => {
  const { original_url } = req.body;
  if (!original_url) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  try {
    const short_code = shortid.generate();
    console.log("Generated short_code:", short_code);  // Debug log
    const newUrl = new Url({ original_url, short_code });
    await newUrl.save();
    res.json({ shortUrl: `http://localhost:5000/${short_code}` });
  } catch (err) {
    console.error("Error saving URL:", err);  // More detailed log
    res.status(500).json({ error: "Server error" });
  }
});


// GET /:code — redirect
app.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ short_code: req.params.code });
    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.original_url);
    } else {
      return res.status(404).json({ error: "Not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.error(err);

  }
});

// GET /admin/list — list all
app.get("/admin/list", async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.json(urls);
});

app.listen(5000, () => console.log("Server running on port 5000"));
