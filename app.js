const http = require("http")
const path = require('path')
const querystring = require("querystring")
const serveStatic = require('serve-static')
const dataformat = require('dataformat')
const template = require('art-template')
const getRouter = require('router')
require('./model/DBconnect')
const Stuednt = require("./model/user")


const view = path.join(__dirname, "views")
const serve = serveStatic(path.join(__dirname, "public"))
template.defaults.root = view
template.defaults.imports.dataformat = dataformat

const router = getRouter()
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
const app = http.createServer()

app.on("request", (req, res) => {
    serve(req, res, () => { })
    router(req, res, () => { })
})
app.listen(3000)
console.log("http://localhost:3000");
