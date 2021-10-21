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

const router = express.Router();

router
    .route("/")
    .get(getAllReviews)
    .post(createPost);

router
    .route("/:id")
    .get(getReview)
    .put(updateReview)
    .delete(deleteReview)