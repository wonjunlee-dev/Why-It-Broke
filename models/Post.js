require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('../models/Comment');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    language: {
        type: Schema.Types.ObjectId,
        ref: "Language",
        required: true
    },
    image: {
        type: String
    },
    author: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
}, { timestamps: true } );

postSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    await Comment.deleteMany({ post: this._id });
    next();
});

module.exports = mongoose.model('Post', postSchema);
