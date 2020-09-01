require('module-alias/register')

const Koa = require('koa')
const initApp = require('./core/init')
const bodyParser = require('koa-bodyparser')
const exception = require('./middware/exception')
const app = new Koa()
app.use(exception)
app.use(bodyParser())
initApp.initEntry(app)
require('./app/models/user')

app.listen(3000)

