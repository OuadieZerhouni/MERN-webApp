const express = require("express");
const router = express.Router();
const PostService = require("../Services/Post");
const { Post_Upload } = require("../util/Fileupload");


router.post("/insert", Post_Upload.single("image"), async (req, res) => {
    req.body.image = req.file.filename;
    const post = await PostService.insertPost(req.body);
    res.send(post);
    }
);

router.post("/get/all", async (req, res) => {
    const post = await PostService.getPosts();
    res.send(post);
});

router.post("/delete", async (req, res) => {
    const post = await PostService.deletePost(req.body._id);
    res.send(post);
});

router.post("/update", async (req, res) => {
    const post = await PostService.updatePost(req.body._id, req.body);
    res.send(post);
});

router.post("/get/id", async (req, res) => {
    const post = await PostService.getPost(req.body._id);
    res.send(post);
});


module.exports = router;