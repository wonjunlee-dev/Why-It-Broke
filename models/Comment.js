require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: { 
        type: String,
        required: true
    },
    author: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
}, { timestamps: true } );

module.exports = mongoose.model('Comment', commentSchema);
