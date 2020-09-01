const { Rule, LinValidator } = require('../../core/lin-validator-v2')
const User = require('../../app/models/user') // 导入User模型用来查找是否有已存在的email
const { LoginType } = require('../../core/enum')

class PositiveValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要为正整数', { min:1 })
        ]
    }
}

// 用户注册校验器
class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '邮箱不符合规范')
        ]
        this.nickname = [
            new Rule('isLength', '昵称最少4个字符，最多16个字符', {min:4,max:16})
        ]
        this.password1 = [
            new Rule('isLength', '密码最少6个字符，最多32个字符', {min:6,max:32}),
            new Rule('matches', '密码太简单', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.password2 = this.password1
    }
    validatePsw(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email,
            }
        })

        if (user) {
            throw new Error('邮箱重复了！')
        }
    }
}

// 获取token校验器
class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '账号长度不对，最小为4最大为32', { min: 4, max: 32})
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '密码格式不对', { min: 6, max: 128})
        ]
        this.validateLoginType = checkType
    }
}

function checkType(vals) {
    let type = vals.body.type || vals.path.type
    if (!type) {
        throw new Error('type是必须参数')
    }
    type = parseInt(type)

    if (!LoginType.inThisType(type)) {
        throw new Error('type参数不合法')
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '参数不能为空', {min: 1})
        ]
    }
}

class LikeValidator extends PositiveValidator {
    constructor() {
        super()
        this.validateType = checkType
    }
}

module.exports = {
    PositiveValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator
}