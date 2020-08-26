module.exports = (req, res) => {
    // 删除session
    req.session.destroy(function() {
        // 删除 cookie
        res.clearCookie('connect.sid')
            // 清空 userInfo
        req.app.locals.userInfo = null
            // 重定向到用户登录页面
        res.redirect('/admin/login')
    })
}