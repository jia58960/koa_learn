const util = require('util')
const axios = require('axios')

const User = require('../models/user')
const { generateToken } = require('../../core/util')
const Auth = require('../../middware/Auth')

class WXManager {
    static async codeToOpenid(code) {
        const {appId, appSecret, loginUrl} = global.conf.wx
        const url = util.format(loginUrl, appId, appSecret, code)
        const res = await axios.get(url)
        if (res.status !== 200) {
            throw new global.errs.AuthFailedException('授权失败')
        }
        let errcode = res.data.errcode
        let errmsg = res.data.errmsg
        if(errcode) {
            throw new global.errs.AuthFailedException(errmsg, errcode)
        }
        let user = await User.getUserByOpenid(res.data.openid)
        if(!user){
            user = await User.registerByOpenid(res.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }
    constructor() {

    }
}

module.exports = {
    WXManager
}