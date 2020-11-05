const Router = require('koa-router')
const {HotBook} = require('@models/hot_book')
const route = new Router({
    prefix:'/v1/book'
})
route.get('/', async(ctx, next) => {
    const favs = await HotBook.getAll()
    ctx.body = {
        books: favs
    }
})
module.exports = route