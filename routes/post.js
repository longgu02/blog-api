const express = require("express");
const router = express.Router();
const PostDetail = require("../models/postDetail.model");

router.get("/", async function (req, res, next) {
  const posts = await PostDetail.find({})
  // res.render("index", { title: "Blog" });
  res.json(posts);
});

// router.post("/create", async function (req, res, next) {
//   const newPost = {
//     title: req.body.title,
//     content: req.body.content,
//     createAt: new Date.now(),
//   }
//   res.json()
// })

module.exports = router;
