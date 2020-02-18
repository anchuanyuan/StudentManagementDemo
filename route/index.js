//系统模块querystring  querystring.parse将请求数据封装成对象
const querystring = require("querystring")
// art-template 模板引擎 用来渲染页面
const template = require('art-template')
// 路由模块 可以较为快速的定义路由
const getRouter = require('router')
// 创建路由对象
const router = getRouter()
// 数据库模型
const Stuednt = require("../model/user")

// 定义不同的路由并展示页面和实现功能
//信息添加的显示页面
router.get('/add', (req, res) => {
    let html = template('index.art', {})
    res.end(html)

})
//展示信息页面
router.get('/list', async (req, res) => {
    let students = await Stuednt.find()
    console.log(students);

    let html = template('list.art', {
        students: students
    })
    res.end(html)
})
// 添加功能
router.post('/add', (req, res) => {
    let formData = ""
    req.on('data', param => {
        formData += param
    })
    req.on('end', async () => {
        const student = querystring.parse(formData)
        await Stuednt.create(student)
        console.log(student);

        res.writeHead(301, {
            Location: "/list"

        })
        res.end()
    })
})
// 将路由导出供主文件进行调用
module.exports = router