const Comment = require('../models/Comment');

async function createComment(req, postID, commentData) {
    try {
        return await Comment.create({
            content: commentData,
            author: {
                _id: req.user._id,
                username: req.user.username
            },
            post: postID
        });
    }
    catch (err) {
        throw new Error("Failed to add a comment");
    }
}

async function getCommentsByPost(postID) {
    return await Comment.find({ post: postID })
    .sort({ createdAt: -1 })
    .lean();
}

async function getCommentsById(userID) {
    return await Comment.find({ "author._id": userID })
    .sort({ createdAt: -1 })
    .lean();
}

async function deleteCommentById(commentID) {
    return await Comment.deleteOne({ _id: commentID });
}

module.exports = { createComment, getCommentsByPost, getCommentsById, deleteCommentById };
