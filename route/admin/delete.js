const { User } = require('../../model/user')
module.exports = async(req, res) => {
    // 使用req.query获取 get请求表单hidden传递过来的参数 id="数据库id地址"
    let id = req.query.id
        // findOneAndDelete()
    await User.deleteOne({ _id: id })
        // 删除完成后页面重定向到user
    res.redirect('/admin/user')
}