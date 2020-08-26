const bcrypt = require('bcrypt')
    // 注意路径
const { User } = require('../../model/user')



module.exports = async(req, res) => {
    // 接收请求参数  body-parser模块处理过后，req.body内存储的就是post请求参数

    // 进行二次验证
    const { email, password } = req.body
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', {
            msg: '邮箱地址或密码未输入'
        })
        // 根据邮箱地址查询用户信息  属性名和变量相同
        // 数据库操作都是异步函数  使用await可以暂停，也可以拿到函数的返回结果  
        // 如果查询到了用户user变量的值是对象类型 对象中存储数据
        // 如果没有拿到 user变量为空
    let user = await User.findOne({ email })
    if (user) {
        // 该方法返回一个布尔值
        let isEqual = await bcrypt.compare(password, user.password)
            // 将客户端传递过来的密码和用户信息中的密码进行比对
        if (isEqual) {
            // 将用户信息存储在session中
            // req.session对象是 express-session模块添加给req的
            req.session.username = user.username
            // 将角色也存储在session中
            req.session.role = user.role
                // res.send('登录成功')
                // app可以从req对象中拿到  req.app
            req.app.locals.userInfo = user
            // 对用户的角色进行判断
            if(user.role == 'admin') {
                // 重定向到用户列表页面
                res.redirect('/admin/user')
            }else {
                // 定向到首页
                res.redirect('/home/')
            }
               
        } else {
            res.status(400).render('admin/error', {
                msg: '邮箱或者密码错误'
            })
        }
    } else {
        // 没有查询到用户
        res.status(400).render('admin/error', { msg: '邮箱未注册' })
    }
}