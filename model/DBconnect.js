const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/student', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('数据库已连接'); })
    .catch((err) => { console.log('数据库连接失败哦', err); })