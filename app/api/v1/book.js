const Router = require('koa-router')
const route = new Router({
    prefix:'/v1/book'
})
route.get('/:id', async(ctx, next) => {
    ctx.body = {
        'hello':ctx.params,
        'header': ctx.request.header,
    }
})
module.exports = route