const { User } = require('../../model/user')
module.exports = async(req, res) => {

    // 这个对象下面添加的属性和值在模板中能直接拿到
    // 这是一个标识，标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user'

    // 接收客户端传递过的当前页的参数
    let page = req.query.page || 1
        // 每一页显示的条数量
    let pagesize = 10
        // 查询用户数据总数
    let count = await User.countDocuments({})
        // 总页数 向上取整
    let tatol = Math.ceil(count / pagesize)

    // 将用户信息从数据库中查询出来 查询条件为空对象
    let users = await User.find({}).limit(pagesize).skip((page - 1) * pagesize)
    res.render('admin/user', {
        users: users,
        page: page,
        tatol: tatol
    })
}