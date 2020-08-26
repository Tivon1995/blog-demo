// user放置的都是对用户数据的操作代码
// 引入joi模块
const Joi = require('joi-browser')
    // 创建用户集合
    // 引入mongoose第三方模块
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.model('User', new mongoose.Schema({
        username: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20
        },
        email: {
            type: String,
            // 保证邮箱唯一,如果重复会报错
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        // admin 超级管理员
        // normal  普通用户
        role: {
            type: String,
            required: true
        },
        state: {
            type: Number,
            // 如果字段为0则是启用状态，字段为1是禁用状态
            default: 0
        }
    }))
    // 将用户集合做为模块成员进行导出
    /* 
    async function createUser(i) {
        let salt = await bcrypt.genSalt(10)

        let pass = await bcrypt.hash('123', salt)

        let user = await User.create({
            username: '星云clone',
            email: i + 'admin@qq.com',
            password: pass,
            role: '超级管理员',
            state: 0
        })
    }
    // createUser()
    for (let i = 0; i < 100; i++) {
        createUser(i)
    } */

// 验证用户信息
const valiadateUser = (user) => {
    // 定义对象的验证规则
    const schema = {
            username: Joi.string().min(2).max(12).required().error(new Error('用户名格式错误')),
            email: Joi.string().email().required().error(new Error('邮箱格式错误')),
            password: Joi.string().regex(/^\w{1,15}$/).required().error(new Error('密码格式错误')),
            role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
            state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
        }
        // 实施验证  将验证结果返回出去
    return Joi.validate(user, schema)
}

module.exports = {
    // 在ES6中，如果一个对象的属性和值相等，可以省略值不写
    // User: User
    User,
    valiadateUser
}