const express = require('express');
const router = express.Router();
const Url = require('../models/Url'); // we'll define this model below
const shortid = require('shortid');

// POST /api/shorten
router.post('/api/shorten', async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Please provide a URL' });
  }

  try {
    // Check if URL already exists
    let url = await Url.findOne({ longUrl });
    if (url) {
      return res.json(url);
    }

    // Create short URL
    const urlCode = shortid.generate();
    const shortUrl = `${req.protocol}://${req.get('host')}/${urlCode}`;

    url = new Url({
      longUrl,
      shortUrl,
      urlCode,
      date: new Date()
    });

    await url.save();
    res.json(url);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /:code (redirect to original URL)
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json({ error: 'No URL found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
