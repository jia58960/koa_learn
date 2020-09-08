const { db } = require('@core/db')
const { DataTypes, Model, Op } = require('sequelize')
class HotBook extends Model{
    static async getAll() {
        const books = await HotBook.findAll({
            order: ['index']
        })
        const ids = []
        // books.forEach()
    }
}

HotBook.init({
    index: DataTypes.STRING, // 做排序用，对于运营特别重要
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING
})