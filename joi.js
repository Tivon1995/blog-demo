// const Joi = require('joi')
// import Joi from 'joi-browser'
//  npm i joi-browser@13.4
const Joi = require('joi-browser')
    // 定义对象验证规则
const schema = {
    username: Joi.string().min(4).max(16).required().error(new Error('name属性未通过验证'))
}

// 实施验证
// 我们可以使用.then()的方式获取结果，但最常用的还是异步函数的方式获取

async function fun() {
    try {
        await Joi.validate({ username: '1234w' }, schema)
    } catch (err) {
        console.log(console.log('验证失败', err.message))
        return
    }
    console.log('验证通过')
}
fun()