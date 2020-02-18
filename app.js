// http模块用来创建服务器
const http = require("http")
// 系统模块 path 主要用来拼接路径
const path = require('path')
// serve-static 模块 用来开启静态资源的访问
const serveStatic = require('serve-static')
// dateformat 用来格式化世间
const dateformat = require('dateformat')
// art-template 模板引擎 用来渲染页面
const template = require('art-template')
// 路由模块
const router = require('./route/index')
// 数据库模块
require('./model/DBconnect')

const view = path.join(__dirname, "views")
const serve = serveStatic(path.join(__dirname, "public"))
template.defaults.root = view // 模板引擎配置路径目录
template.defaults.imports.dateformat = dateformat //模板引擎配置导入方法

const app = http.createServer()

app.on("request", (req, res) => {
    serve(req, res, () => { })
    router(req, res, () => { })
})
app.listen(80)
console.log("http://localhost");
