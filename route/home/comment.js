const { Comment } = require('../../model/comment')

module.exports = async(req, res) => {
    // 对象解构拿到post参数
    const { uid, aid, content } = req.body
    if (content.trim() != '') {

        // 将评论信息存储到评论集合中
        await Comment.create({
            uid: uid,
            aid: aid,
            content: content,
            time: new Date()
        })
    }
    res.redirect('/home/article?id=' + aid)
}