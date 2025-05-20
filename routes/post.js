const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');
const comment = require('../controllers/commentController');
const upload = require("../middleware/upload");
const secure = require('../middleware/auth');

router.get("/posts", async (req, res) => {
    const { languageId } = req.query;

    try {
        let postsData;

        if (languageId) {
            postsData = await post.getPostByLanguage(languageId);
        }
        else {
            postsData = await post.getAllPosts();
        }

        res.render("posts", { posts: postsData, selectedLanguageId: languageId });
    }
    catch (err) {
        res.status(500).render("500", { message: "Something went wrong. Please try again later." });
    }
});

router.get("/posts/:postId", async (req, res) => {
    try {
        const po = await post.getPostById(req.params.postId);
        const comments = await comment.getCommentsByPost(req.params.postId);

        if (po.matchedCount === 0)
            return res.status(404).render("404", { message: "Sorry, we couldn't find any posts" });

        res.render("post", { post: po, comments: comments });
    }
    catch (err) {
        res.status(500).render("500", { message: "Something went wrong. Please try again later." });
    }
});

router.post("/addPost", secure.passportAuth({ redirect: false }), upload.single("image"), post.createPost);

router.get("/addPost", secure.passportAuth({ redirect: true }), async (req, res) => {
    res.render("addPost");
});

router.post("/editPost", secure.passportAuth({ redirect: false }), upload.single("image"), async (req, res) => {
    try {
        const postData = {
            ...req.body,
            image: req.file ? "/uploads/" + req.file.filename : req.body.existingImage,
        };

        const result = await post.editPost(req.body.id, postData);

        if (result.matchedCount === 0)
            return res.status(404).render("404", { message: "Sorry, we couldn't find any posts" });

        res.status(200).json({ message: "Post successfully updated" });
    }
    catch (err) {
        res.status(500).render("500", { message: "Something went wrong. Please try again later." });
    }
});

router.get("/editPost/:postId", secure.passportAuth({ redirect: true }), async (req, res) => {
    try {
        const po = await post.getPostById(req.params.postId);

        if (po.matchedCount === 0)
            return res.status(404).render("404", { message: "Sorry, we couldn't find any posts" });

        res.render("editPost", { post: po });
    }
    catch (err) {
        res.status(500).render("500", { message: "Something went wrong. Please try again later." });
    }
});

router.post("/deletePost/:postId", secure.passportAuth({ redirect: false }), async (req, res) => {
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
