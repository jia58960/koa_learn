const { db } = require('../../core/db')
const { DataTypes, Model } = require('sequelize')

const classicModel = {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.STRING,
    fav_nums: DataTypes.INTEGER,
    pubdate: DataTypes.DATEONLY,
    type: DataTypes.TINYINT

}

class Movie extends Model {}

Movie.init(classicModel, {
    tableName: 'movie',
    sequelize: db
})

class Music extends Model {}
const musicModel = Object.assign({ url : DataTypes.STRING}, classicModel)
Music.init(musicModel, {
    tableName: 'music',
    sequelize: db
})

class Sentence extends Model {}

Sentence.init(classicModel, {
    tableName: 'sentence',
    sequelize: db
})

module.exports = {
    Sentence,
    Music,
    Movie
}