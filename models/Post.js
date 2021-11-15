const mongoose = require("mongoose");
const express = require("express");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide post title"],
    },
    description: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isAllowed: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        replys: [
          {
            user: {
              type: mongoose.Schema.ObjectId,
              ref: "User",
            },
            text: {
              type: String,
              required: true,
            },
            date: {
              type: Date,
              default: Date.now,
            },
          },
        ],
      },
    ],

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
