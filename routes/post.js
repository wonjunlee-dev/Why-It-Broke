const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');
const comment = require('../controllers/commentController');
const upload = require("../middleware/upload");
const secure = require('../middleware/auth');

router.post("/posts", secure.passportAuth({ redirect: false }), upload.single("image"), async (req, res) => {
    try {
        const newPost = await post.createPost(req, res);

        res.status(201).json({ message: "Post successfully created", postId: newPost._id });
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
});

router.put("/posts/:postId", secure.passportAuth({ redirect: false }), upload.single("image"), async (req, res) => {
    try {
        const postData = {
            ...req.body,
            image: req.file ? "/uploads/" + req.file.filename : req.body.existingImage,
        };

        const result = await post.editPost(req.params.postId, postData);

        if (result.matchedCount === 0)
            return res.status(404).render("404", { message: "Sorry, we couldn't find any posts" });

        res.status(200).json({ message: "Post successfully updated" });
    }
    catch (err) {
        res.status(500).render("500", { message: "Something went wrong. Please try again later." });
    }
});

router.delete("/posts/:postId", secure.passportAuth({ redirect: false }), async (req, res) => {
    try {
        const result = await post.deletePost(req.params.postId);

        if (result.deletedCount === 0)
            return res.status(404).render("404", { message: "Sorry, we couldn't find any posts" });
        
        res.status(204).json();
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
});

module.exports = router;
