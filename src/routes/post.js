const express = require("express");
const router = express.Router();
const PostDetail = require("../models/postDetail.model");

router.get("/", async (req, res, next) => {
  const posts = await PostDetail.find({});
  // res.render("index", { title: "Blog" });
  res.json(posts);
});

router.post("/create", async (req, res, next) => {
  try {
    const newPost = new PostDetail({
      title: req.body.title,
      content: req.body.content,
      createAt: Date.now(),
    });
    await newPost.save();
    res.json({ message: "Successfully", post: newPost });
  } catch (err) {
    res.json({ message: "Failed", error: err.message });
  }
});

router.put("/:id/edit", async (req, res, next) => {
  let matchPost = PostDetail.findById(req.params.id);
  try {
    matchPost.title = req.body.title;
    matchPost.slug = req.body.slug;
    matchPost.content = req.body.content;
    matchPost.slug = req.body.slug;
    matchPost.slug = req.body.slug;
    matchPost.slug = req.body.slug;
    matchPost.slug = req.body.slug;
    res.json({ message: "Successfully", post: newPost });
  } catch (err) {
    res.json({ message: "Failed", error: err.message });
  }
});

module.exports = router;
