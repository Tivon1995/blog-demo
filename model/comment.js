const mongoose = require('mongoose')

const Comment = mongoose.model('Comment', new mongoose.Schema({
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date,
        default: Date.now
    },
    content: String
}))

module.exports = {
    Comment
}