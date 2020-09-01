const { HttpException } = require("../core/http-exception")

const catchExp = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        const isDev = global.conf.env === 'dev'
        const isHttpException = error instanceof HttpException
        // 开发环境且非http异常直接抛出
        if(isDev && !isHttpException) {
            throw error
        }
        if (isHttpException) {
            ctx.body = {
                message: error.message,
                errCode: error.errCode,
                request_url: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                message: 'we made a mistake',
                errCode: 10000,
                request_url: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchExp