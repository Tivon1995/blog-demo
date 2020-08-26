// 引用express 框架
const express = require('express')

const home = express.Router()

home.get('/', require('./home/index'))
    // 将路由对象作为模块成员进行导出
home.get('/article', require('./home/article'))

home.get('/logout', require('./home/logout'))

// 添加评论post
home.post('/comment', require('./home/comment'))

module.exports = home