module.exports = (req, res) => {
    // 这个对象下面添加的属性和值在模板中能直接拿到
    // 这是一个标识，标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'article'

    res.render('admin/article-edit')
}