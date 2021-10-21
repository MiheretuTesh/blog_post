const express = require("express");

const {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviews");

//models
const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(getAllReviews)
    .post(createReview);

router
    .route("/:id")
    .get(getReview)
    .put(updateReview)
    .delete(deleteReview);

module.exports = router;