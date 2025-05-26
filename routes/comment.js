const express = require('express');
const router = express.Router();
const comment = require('../controllers/commentController');
const secure = require('../middleware/auth');

router.post("/comments/:postId", secure.passportAuth({ redirect: false }), async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;

    try {
        await comment.createComment(req, postId, content);

        res.status(201).json({ message: "Comment successfully added" });
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
});

router.delete("/comments/:commentId", secure.passportAuth({ redirect: false }), async (req, res) => {
    try {
        const result = await comment.deleteCommentById(req.params.commentId);

        if (result.deletedCount === 0)
            res.status(404).json({ error: "Comment Not Found"});
        
        res.status(200).json({ message: "Comment deleted successfully" });
    }
    catch (err) {
        res.status(500).json({error: "Something went wrong. Please try again later."});
    }
});


module.exports = router;
