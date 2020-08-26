// 密码加密模块
const bcrypt = require('bcrypt')
const { User, valiadateUser } = require('../../model/user')
module.exports = async(req, res, next) => {

    try {
        await valiadateUser(req.body)
    } catch (error) {
        // res.redirect('/admin/user-edit?message=' + e.message)
        // JSON.stringify() 将对象数据类型转换为字符串数据类型
        // 使用next(err)将控制权,移交给错误处理中间件
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }))
    }
    // 查询操作，根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        // redirect以及包含了终止请求的功能
        return res.redirect(`/admin/user-edit?message=邮箱地址已经注册过了`)
    }
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    req.body.password = password
    await User.create(req.body)
    res.redirect('/admin/user')
}