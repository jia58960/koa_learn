const { db } = require('@core/db')
const { DataTypes, Model, Op, Sequelize } = require('sequelize')
const { Favor } = require('./favor')
class HotBook extends Model{
    static async getAll() {
        const books = await HotBook.findAll({
            order: ['index']
        })
        const ids = []
        books.forEach(book => {
            ids.push(book.id)
        })

        const favors = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]: ids
                }
            },
            group: 'art_id',
            attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })
        return favors
    }
}

HotBook.init({
    index: DataTypes.STRING, // 做排序用，对于运营特别重要
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING
}, {
    sequelize:db,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}