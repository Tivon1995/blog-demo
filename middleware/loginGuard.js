const guard = (req, res, next) => {
    // 判断用户访问的是否是登陆页面
    // 判断用户的登陆状态
    // 如果用户是登录的 将请求放行
    // 如果用户不是登录的 将请求重定向到登陆页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        // 如果用户是登陆状态且角色是normal 跳转到首页

        if (req.session.role == 'normal') {
            return res.redirect('/home/')
        }
        // 用户是登陆状态 将请求放行 到admin路由且角色是管理员
        next()
    }
}

module.exports = guard