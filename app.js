// 引入express框架
const express = require('express')
const path = require('path')
    // 引入body-parser模块，用来处理post请求参数
const bodyParser = require('body-parser')

// 导入config模块
const config = require('config')

// 引入margan模块
const morgan = require('morgan')

// 导入 art-template
const template = require('art-template')

// dateformat模块
const dateFormat = require('dateformat')
    // 调用这个方法  向模板内部导入该方法
template.defaults.imports.dateFormat = dateFormat

// 调入express-session模块
const session = require('express-session')
const app = express()
    // 数据库连接
require('./model/connect')
    // require('./model/user')
    // require('./model/article')

// 处理post请求参数   body-parser只能处理普通表单传送过来的数据
app.use(bodyParser.urlencoded({ extended: false }))
    // 


// session方法内的固有属性 secret : 'secret key'
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'secret key', //  建议使用128个字符的随机字符串
}))



// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'))
    // 告诉express框架模板的默认后缀
app.set('view engine', 'art')
    // 当渲染模板后缀为art的模板时  所使用的模板引擎是什么
app.engine('art', require('express-art-template'))


// 获取系统环境变量 返回值是对象 process获取系统环境变量对象
if (process.env.NODE_ENV == 'development') {
    // console.log('当前是开发环境')
    // 在开发环境中，将客户端发送到服务器端的请求打印到控制台中
    // app.use(morgan('dev'))
    console.log('当前是开发环境')
} else {
    console.log('当前是生产环境')
}

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

// 引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')
const { title } = require('process')

// 中间件是有顺序的，依次向下执行，要写在路由之前
// user的第一个参数不是一定要匹配到'/admin'，它匹配的是以/admin开头
// 拦截请求，判断用户登陆状态 和 角色信息
app.use('/admin', require('./middleware/loginGuard'))

// 使用app.use拦截路由，为路由匹配请求路径
app.use('/home', home)
app.use('/admin', admin)

// 错误处理中间件
app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse()
    // let obj = { path: '/admin/user-edit', message: '密码错误', id: id }
    const result = JSON.parse(err)
    let params = []
    for (let attr in result) {
        if (attr != 'path') {
            // 属性=属性值   改造成字符串
            params.push(attr + '=' + result[attr])
        }
    }
    // let str = params.join('&')
    res.redirect(`${result.path}?${params.join('&')}`)
})

app.listen(80)
console.log('服务器创建成功')