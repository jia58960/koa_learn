const Router = require('koa-router')
const { RegisterValidator } = require('@validator')
const User = require('@models/user') // 导入User的model才能操作数据库
const router =  new  Router({
    prefix: '/v1/user'
})
router.post('/register', async(ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)
    const { email, nickname, password1 } = v.get('body')
    await User.create({ email, nickname, password: password1 }) // create方法用来插入数据
    throw new global.errs.Success()
})

module.exports = router