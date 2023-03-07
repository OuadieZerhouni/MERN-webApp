const express = require("express");
const router = express.Router();
const PostService = require("../Services/Post");
const { Post_Upload } = require("../util/Fileupload");
const dotenv = require("dotenv").config();

router.post("/insert", Post_Upload.single("image"), async (req, res) => {

    req.body.image = process.env.APP_DOMAIN + "/uploads/posts/" + req.file.filename;
    console.log(req.body);
    const post = await PostService.insertPost(req.body);
    res.send(post);
    }
);

router.get("/", async (req, res) => {
    const post = await PostService.getPosts();
    res.send(post);
});

router.delete("/:id", async (req, res) => {
    const post = await PostService.deletePost(req.params.id);
    res.send(post);
});

router.put("/:id", async (req, res) => {
    const post = await PostService.updatePost(req.params.id, req.body);
    res.send(post);
});

router.get("/:id", async (req, res) => {
    const post = await PostService.getPost(req.params.id);
    res.send(post);
});


module.exports = router;
