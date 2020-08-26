// 引用express 框架
const express = require('express')

const admin = express.Router()
const querysring = require('querystring')
    // 引入集合构造函数 由于是用对象的方式暴露的，需要用到对象解构

admin.get('/login', require('./admin/loginPage'))
    // 实现登录功能
admin.post('/login', require('./admin/login'))
    // 实现退出功能
admin.get('/logout', require('./admin/logout'))
    // 创建用户列表路由
admin.get('/user', require('./admin/userPage'))
    // 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'))
    // 创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'))

// 创建用户信息修改路由
admin.post('/user-modify', require('./admin/user-modify'))
    // 创建删除用户信息路由
admin.get('/delete', require('./admin/delete'))

// 创建文章列表页面路由
admin.get('/article', require('./admin/article'))

// 创建文章编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'))

// 创建添加文章路由
admin.post('/article-add', require('./admin/article-add'))

module.exports = admin