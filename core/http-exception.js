class HttpException extends Error {
    constructor(msg = '服务器错误', errCode = 10001, code = 400) {
        super()
        this.message = msg
        this.errCode = errCode
        this.code = code
    }
}

class AuthFailedException extends HttpException {
    constructor(msg = '授权失败', errCode = 10001) {
        super()
        this.message = msg
        this.errCode = errCode
        this.code = 401
    }
}

class NotFound extends HttpException{
    constructor(msg = '资源未找到', errCode = 10004) {
        super()
        this.message = msg
        this.errCode = errCode || 10000
        this.code = 404
    }
}

class ForbiddenException extends HttpException {
    constructor(msg, errCode) {
        super()
        this.message = msg || '权限不足'
        this.errCode = errCode || 10006
        this.code = 403
    }
}

class ParameterException extends HttpException {
    constructor(msg, errCode) {
        super()
        this.message = msg || '参数错误'
        this.errCode = errCode || 10002
        this.code = 400
    }
}

class LikeException extends HttpException {
    constructor(msg, errCode) {
        super()
        this.message = msg || '已经喜欢过啦'
        this.errCode = errCode || 10008
        this.code = 400
    }
}
class DisLikeException extends HttpException {
    constructor(msg, errCode) {
        super()
        this.message = msg || '你已经取消过啦'
        this.errCode = errCode || 10009
        this.code = 400
    }
}

// 因为有个兜底的exception.js 所以咱们可以使用这种方式
class Success extends HttpException {
    constructor(msg) {
        super()
        this.message = msg || 'ok'
        this.errCode = 0
        this.code = 200
    }
}
module.exports = {
    HttpException,
    ParameterException,
    AuthFailedException,
    ForbiddenException,
    LikeException,
    DisLikeException,
    Success,
    NotFound
 }