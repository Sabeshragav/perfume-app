const express = require("express");
const Review = require("../models/Review");
const router = express.Router();


// Get reviews for a product
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// Add a review
router.post("/", async (req, res) => {
  try {
    const { productId, username, comment, rating } = req.body;
    const review = new Review({ productId, username, comment, rating });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to add review" });
  }
});

module.exports = router;