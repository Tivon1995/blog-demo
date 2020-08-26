// 1.引入mongoose模块
const mongoose = require('mongoose')
    // 2.创建文章集合规则
    // 3.根据规则创建集合
const Article = mongoose.model('Article', new mongoose.Schema({
        title: {
            type: String,
            minlength: 2,
            maxlength: 50,
            // 还可以写一个数组，数组的第二个参数为错误信息
            required: [true, '请填写文章标题']
        },
        author: {
            // 特有的数据类型
            type: mongoose.Schema.Types.ObjectId,
            // 集合规则的名称
            ref: 'User',
            required: [true, '请传递作者']
        },
        publishDate: {
            type: Date,
            // 默认时间为现在
            default: Date.now
        },
        cover: {
            type: String,
            default: null
        },
        content: {
            type: String
        }
    }))
    // 4.集合规则作为模块成员导出
    // async function run() {
    //     await Article.create({
    //         title: '文章标题你看好',
    //         content: '我是文章内容'
    //     })
    // }
    // for (let i = 0; i < 100; i++) {
    //     run()
    // }

module.exports = {
    Article
}