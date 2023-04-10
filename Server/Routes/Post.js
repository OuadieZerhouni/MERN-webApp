const express = require("express");
const router = express.Router();
const PostService = require("../Services/Post");
const { Post_Upload } = require("../util/Fileupload");
const dotenv = require("dotenv").config();
const { body, validationResult } = require("express-validator");
const verifyToken=require('../util/verification').verifyToken;


router.get("/", async (req, res) => {
  try {
    const post = await PostService.getPosts();
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await PostService.getPost(req.params.id);
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.use(verifyToken);

router.delete("/:id", async (req, res) => {
  try {
    const post = await PostService.deletePost(req.params.id);
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await PostService.updatePost(req.params.id, req.body);
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.post("/", Post_Upload.single("image"),
[
  body("title").notEmpty().withMessage("Title is required"),
  body("text").notEmpty().withMessage("Text is required")
],
async (req, res) => {
  try {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    req.body.image = process.env.APP_DOMAIN + "/uploads/posts/" + req.file.filename;
    const post = await PostService.insertPost(req.body);
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});



module.exports = router;
