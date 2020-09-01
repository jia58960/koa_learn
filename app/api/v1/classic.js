const Router = require('koa-router')
const { PositiveValidator } = require('@validator')
const { Flow } = require('@models/flow')
const { Art } = require('@models/art')
const { Favor } = require('@models/favor')
const Auth = require('@auth')
const router =  new  Router({
    prefix: '/v1/classic'
})

router.get('/latest', new Auth().m, async(ctx, next) => {
    const flow = await Flow.findOne({ // 倒序取第一个
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.art_id, flow.type)
    const isLike = await Favor.LikeStatus(ctx.auth.uid, flow.art_id, flow.type)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', isLike)
    ctx.body = art
})

/* router.get('/v1/:id/classic', async(ctx, next) => {
    const param = ctx.params
    const query = ctx.request.query
    const header = ctx.request.header
    ctx.body = {
        param,
        query,
        header,
        'module': 'classic'
    }
}) */

router.post('/v1/:id/classic', async(ctx, next) => {
    const param = ctx.params
    const query = ctx.request.query
    const header = ctx.request.header
    const body = ctx.request.body
    const v = new PositiveValidator().validate(ctx)
    ctx.body = {
        param,
        query,
        header,
        body,
        'module': 'classic'
    }
})
module.exports = router