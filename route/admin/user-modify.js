const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async(req, res, next) => {

    const id = req.query.id
    const { username, email, state, role, password } = req.body
        // 注意，数据库操作都是异步
    const user = await User.findOne({ _id: id })
    let isEqual = await bcrypt.compare(password, user.password)
    if (isEqual) {
        // 比对成功
        // 将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        })
        res.redirect('/admin/user')
    } else {
        // 比对失败
        let obj = { path: '/admin/user-edit', message: '密码错误', id: id }
            // next只能传递一个参数，字符串类型的
        next(JSON.stringify(obj))
    }
}