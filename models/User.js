require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    loginHistory: [{
        dateTime: Date,
        userAgent: String
    }]
}, { timestamps: true } );

userSchema.pre('save', async function () {
    if (!this.isModified('password'))
        return;

    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);
