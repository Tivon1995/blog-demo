const formidabel = require('formidable')
const path = require('path')
const { Article } = require('../../model/article')
module.exports = (req, res) => {



    const form = new formidabel.IncomingForm()
        // 设置文件上传路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
        // 保留文件上传的后缀
    form.keepExtensions = true
        // fields对象类型存储除了二进制以外的其它信息
        // files 对象类型 保存了上传文件相关的数据
    form.parse(req, async(err, fields, files) => {
        // err 错误对象，如果读取成功返回null，读取失败返回错误对象
        // files对象下的cover对象下的path属性存储的就是绝对路径
        // split分割后，返回一个数组，此处明显返回public分割的两段数组，选[1]位
        // let v = files.cover.path.split('public')[1]
        await Article.create({
                title: fields.title,
                author: fields.author,
                publishDate: fields.publishDate,
                cover: files.cover.path.split('public')[1],
                content: fields.content
            })
            // 将页面重定向到文章列表页面
        res.redirect('/admin/article')
    })
}