const auth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
    static USER = 8
    static ADMIN = 16
    static SUPER_ADMIN = 32
    constructor(level) {
        this.level = level || 1
    }
    get m() {
        return async (ctx, next) => {
            const token = auth(ctx.req)
            let errMsg = 'token不合法'
            if (!token || !token.name) {
                throw new global.errs.ForbiddenException(errMsg)
            }
            try {
                var decode = jwt.verify(token.name, global.conf.security.secretKey)
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new global.errs.ForbiddenException(errMsg)
            }
            // 缓存常用数据在ctx对象中
            const { uid, scope } = decode
            if (scope < this.level) {
                throw new global.errs.ForbiddenException('权限不足！')
            }
            ctx.auth = {
                uid,
                scope
            }
            await next()
        }
    }
    static verifyToken(token) {
        try {
            jwt.verify(token, global.conf.security.secretKey)
            // const decoded = jwt.decode(token, {complete: true})
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = Auth