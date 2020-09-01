// 引入sequelize 初始化连接数据库
const { Sequelize } = require('sequelize')
const {
    host,
    port,
    dbName,
    user,
    password
} = require('../config/config').db

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    timezone: '+08:00',
    logging: console.log,
    host,
    port,
    define: {
        timestamps:true,
        paranoid:true, // 软删除
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        // underscored:true,
        freezeTableName:true,
        scopes: {
            bh: {
                attributes: {
                    exclude:['updated_at','deleted_at','created_at']
                }
            }
        }
    }
})
// 是否强制同步建表，有的话是否删除
sequelize.sync({
    force: false // 生产环境中别设置为true，血的教训
})
/* 
// 测试连接代码
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
testConnection() */
module.exports = {
    db: sequelize
}