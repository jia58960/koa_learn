const Router = require('koa-router')
const { LikeValidator } = require('@validator')
const Auth = require('@auth')
const { Favor } = require('@models/favor')
const router = new Router({
    prefix: '/v1/like'
})

router.post('/', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {
        id:'art_id' // 别名
    })
    const { art_id, type } = v.get('body')
    await Favor.like(ctx.auth.uid, art_id, type)
    throw new global.errs.Success('点赞成功')
})
router.post('/cancel', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {
        id:'art_id'
    })
    const { art_id, type } = v.get('body')
    await Favor.Dislike(ctx.auth.uid, art_id, type)
    throw new global.errs.Success('取消点赞成功')
})

module.exports = router