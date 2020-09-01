const { db } = require('../../core/db')
const { DataTypes, Model } = require('sequelize')
class Flow extends Model {}
Flow.init({
    art_id: DataTypes.INTEGER,
    index: DataTypes.INTEGER,
    type: DataTypes.INTEGER
}, {
    sequelize: db,
    tableName: 'flow'
})

module.exports = {
    Flow
}