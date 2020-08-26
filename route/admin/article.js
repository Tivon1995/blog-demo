const { Article } = require('../../model/article')
const pagination = require('mongoose-sex-page')
module.exports = async(req, res) => {
    let { page } = req.query
        // 这个对象下面添加的属性和值在模板中能直接拿到
        // 这是一个标识，标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article'
        // 会将author变成一个对象，对象下面存储着对应id的各种数据
        // page 指定当前页码
        // size 每页条数
        // display 要显示的页码数量
        // exec 向数据库中发送查询请求
        // records  查询到的数据存储数组
    let articles = await pagination(Article).find().page(page).size(10).display(10).populate('author').exec()

    res.render('admin/article', {
            articles: articles,
            pages: articles.pages - 0
        })
        // res.send(articles)
}