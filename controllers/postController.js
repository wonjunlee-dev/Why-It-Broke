const Post = require('../models/Post');

async function getRecentPosts() {
    const recentPosts = await Post.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("language")
    .populate("author._id")
    .lean();

    return recentPosts;
}

async function getAllPosts() {
    return await Post.find().populate("language").populate("author._id");
}

async function getPostById(postID) {
    return await Post.findById(postID);
}

async function getPostsById(userId) {
    return await Post.find({ "author._id": userId })
    .sort({ createdAt: -1 })
    .lean();
}

async function getPostByLanguage(languageId) {
    return await Post.find({ language: languageId }).populate("language").populate("author._id");
}

async function createPost(req, res) {
    const { title, description, language } = req.body;

    const imgFile = req.file;
    const image = imgFile ? "/uploads/" + imgFile.filename : "";

    const newPost = await Post.create({
        title,
        description,
        language,
        image,
        author: {
            _id: req.user._id,
            username: req.user.username
        }
    });

    return newPost;
};

async function editPost(postID, postData) {
    try {
        return await Post.updateOne(
            { _id: postID },
            postData
        );
    }
    catch (err) {
        throw new Error("Failed to update post");
    }
}

async function deletePost(postID) {
    try {
        const post = await getPostById(postID);

        if (!post)
            throw new Error("Post not found");

        return await post.deleteOne();
    }
    catch (err) {
        throw new Error("Failed to delete post");
    }
}

module.exports = { getRecentPosts, getAllPosts, getPostById, getPostsById, getPostByLanguage, createPost, editPost, deletePost };
