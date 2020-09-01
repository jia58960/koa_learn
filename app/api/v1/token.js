const Router = require('koa-router')
const { TokenValidator, NotEmptyValidator } = require('@validator')
const { LoginType } = require('@core/enum')
const { generateToken } = require('@core/util')
const Auth = require('@auth')
const User = require('@models/user')
const { WXManager } = require('@services/wx')
const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx, next) => {
    // `写api第一步就是做参数校验`
    const r = await new TokenValidator().validate(ctx)
    const { account, secret, type } = r.get("body")
    let token
    switch(type) {
        case LoginType.USER_EMAIL:
            token = await emailVerify(account, secret)
            break
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToOpenid(account)
            break
        case LoginType.USER_MOBILE:
            break
        default: throw new global.errs.ParameterException('未知的登录类型')
    }
    ctx.body = {
        token
    }
})

router.post('/verify', async (ctx) => {
    const r = await new NotEmptyValidator().validate(ctx)
    ctx.body ={
        is_valid: Auth.verifyToken(r.get('body.token'))
    } 
})
async function emailVerify (account, secret) {
    const user = await User.verifyEmailLogin(account, secret)
    return token = generateToken(user.id, Auth.USER)
}
module.exports = router