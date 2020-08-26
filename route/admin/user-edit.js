const { User } = require('../../model/user')
module.exports = async(req, res) => {

    // 这个对象下面添加的属性和值在模板中能直接拿到
    // 这是一个标识，标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user'

    // 解构get请求地址栏中的参数
    const { message, id } = req.query
        // resder读取的是静态资源文件，直接在admin文件夹中获取
        // redirect(/admin/user)是重定向，默认url是http://localhost
    if (id) {
        let user = await User.findOne({ _id: id })
        res.render('admin/user-edit', {
            user,
            message,
            link: '/admin/user-modify?id=' + id,
            button: '修改',
        })
    } else {
        res.render('admin/user-edit', {
            message,
            link: '/admin/user-edit',
            button: '添加'
        })
    }
}