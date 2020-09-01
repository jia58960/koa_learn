const Router = require('koa-router')
const route = new Router()
route.get('/v1/book/:id', async(ctx, next) => {
    ctx.body = {
        'hello':ctx.params,
        'header': ctx.request.header,
    }
})
module.exports = route