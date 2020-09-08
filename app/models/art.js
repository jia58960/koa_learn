const {
    Sentence,
    Music,
    Movie
} = require('./classic')

const { Favor } = require('./favor')

//展平数组
const {flatten} = require('lodash')
const { Op } = require('sequelize')

class Art {
    constructor(art_id, type) {
        // 将属性初始化进来
        this.art_id = art_id
        this.type = type
    }
    // 实例方法
    async getDetail(uid) {
        const art = await Art.getData(this.art_id, this.type)
        if (!art) {
            throw new global.errs.NotFound()
        }
        const isLike = await Favor.LikeStatus(uid, this.art_id, this.type)
        return {
            art,
            like_status: isLike
        }
    }
    // 静态方法
    static async getClassicData(datas) {
        const result = []
        for(let data of datas) {
            result.push(await Art._getDozenOfData(data.ids, data.type))
            // sconsole.log(await this._getDozenOfData(data.ids, data.type))
        }
        return flatten(result)
    }
    // 静态方法，标准做法是将该方法封装进ArtCollection类
    static async _getDozenOfData(ids, type) {
        const finder = {
            where: {
                id: {
                    [Op.in]: ids // 对应mysql的in语句
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
        // useScope控制是否取出delete_at update_at created_at等字段，在db.js中全局定义了
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