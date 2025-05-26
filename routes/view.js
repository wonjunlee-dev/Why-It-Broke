const express = require('express');
const router = express.Router();
const post = require('../controllers/postController');
const comment = require('../controllers/commentController');
const secure = require('../middleware/auth');

router.get("/", async (req, res) => {
    try {
        const posts = await post.getRecentPosts();
        res.render("home", { recentPosts: posts });
    }
    catch (err) {
        res.json(`ERR: ${err}`);
    }
});

router.get("/loginHistory", secure.passportAuth({ redirect: true }), (req, res) => {
    res.render("loginHistory");
});

router.get("/userHistory", secure.passportAuth({ redirect: true }), async (req, res) => {
    const tab = req.query.tab || 'posts';
    const posts = await post.getPostsById(req.user._id);
    const comments = await comment.getCommentsById(req.user._id);

    res.render("userHistory", { posts: posts, comments: comments, tab: tab });
});

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

router.get("/addPost", secure.passportAuth({ redirect: true }), async (req, res) => {
    res.render("addPost");
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

module.exports = router;
