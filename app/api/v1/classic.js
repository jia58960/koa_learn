const Router = require('koa-router')
const { PositiveValidator, ClassicValidator } = require('@validator')
const { Flow } = require('@models/flow')
const { Art } = require('@models/art')
const { Favor } = require('@models/favor')
const Auth = require('@auth')
const router =  new  Router({
    prefix: '/v1/classic'
})

router.get('/latest', new Auth().m, async(ctx, next) => {
    const flow = await Flow.findOne({// 倒序取第一个
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

router.get('/:index/previous', new Auth().m, async (ctx, next) => {
    const v = await new PositiveValidator().validate(ctx, {
        id:'index'
    })

    const flow = await Flow.findOne({
        where: {
            index: v.get('path.index') - 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const isLike = await Favor.LikeStatus(ctx.auth.uid, flow.art_id, flow.type)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', isLike)
    ctx.body = art
})

router.get('/:index/next', new Auth().m, async (ctx, next) => {
    const v = await new PositiveValidator().validate(ctx, {
        id:'index'
    })

    const flow = await Flow.findOne({ 
        where: {
            index: v.get('path.index')  + 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound()
    }
    const art = await Art.getData(flow.art_id, flow.type)
    const isLike = await Favor.LikeStatus(ctx.auth.uid, flow.art_id, flow.type)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', isLike)
    ctx.body = art
})

router.get('/:art_id/:type/favor', new Auth().m,  async (ctx, next) => {
    const v  = await new ClassicValidator().validate(ctx, {
        id: 'art_id'
    })
    const { art_id } = v.get('path')
    const type = parseInt(v.get('path.type'))
    const art = await Art.getData(art_id, type)
    if (!art) {
        throw new global.errs.NotFound()
    }
    const artDetail = await new Art(art_id, type).getDetail(ctx.auth.uid)
    ctx.body = {
        fav_nums: artDetail.art.fav_nums,
        like_status: artDetail.like_status
    }
})

router.get('/:art_id/:type', new Auth().m,  async (ctx, next) => {
    const v  = await new ClassicValidator().validate(ctx, {
        id: 'art_id'
    })
    const { art_id } = v.get('path')
    const type = parseInt(v.get('path.type'))
    const artDetail = await new Art(art_id, type).getDetail(ctx.auth.uid)
    artDetail.art.setDataValue('like_status', artDetail.like_status)
    ctx.body = artDetail.art
})

router.get('/favor', new Auth().m, async (ctx, next) => {
    const res = await Favor.getFavor(ctx.auth.uid)
    ctx.body = await Art.getClassicData(res)
})
//demo
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