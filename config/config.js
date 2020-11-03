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
        appSecret:'6595f8efa55e43a77a867f539969acb7',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
}