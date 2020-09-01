module.exports = {
    env: 'dev',
    db: {
        host: 'localhost',
        port: 3306,
        dbName: 'island',
        user: 'root',
        password: '123456'
    },
    security: {
        secretKey: 'sklfjalgagasbgal', // 越复杂越好
        expiresIn: '7d' // 7天过期
    },
    wx:{
        appId:'wx1a80d77db6402979',
        appSecret:'9c7b231134e82f3b02258d118fd0389e',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
}