const {
    Sentence,
    Music,
    Movie
} = require('./classic')

//展平数组
const {flatten} = require('lodash')
const { Op } = require('sequelize')

class Art {
    static async getClassicData(datas) {
        const result = []
        for(let data of datas) {
            result.push(await Art._getDozenOfData(data.ids, data.type))
            // sconsole.log(await this._getDozenOfData(data.ids, data.type))
        }
        return flatten(result)
    }
    static async _getDozenOfData(ids, type) {
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        let art = null
        switch (type) {
            case 100: // type100为movie类型
                art = await Movie.scope('bh').findAll(finder)
            break;
            case 200: // 200为音乐类型
                art = await Music.scope('bh').findAll(finder)
            break;
            case 300: // 300为句子类型
                art = await Sentence.scope('bh').findAll(finder)
            break;
            case 400:
            break;
            default:
            break;
        }
        return art
    }
    static async getData(art_id, type, useScope = true) {
        const finder = {
            id: art_id
        }
        let art = null
        // scope控制是否要取出delete_at update_at created_at等字段，在db.js中全局定义了
        const scope = useScope ? 'bh' : null
        switch (type) {
            case 100: // type100为movie类型
                art = await Movie.scope(scope).findOne(finder)
            break;
            case 200: // 200为音乐类型
                art = await Music.scope(scope).findOne(finder)
            break;
            case 300: // 300为句子类型
                art = await Sentence.scope(scope).findOne(finder)
            break;
            case 400:
            break;
            default:
            break;
        }
    return art
    }
}

module.exports = {
    Art
}