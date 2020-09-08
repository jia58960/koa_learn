const { db } = require('@core/db')
const { DataTypes, Model, Op } = require('sequelize')
const { Art } = require('./art') // 业务表

class Favor extends Model {
    static async like(uid, art_id, type) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                uid,
                type
            }
        })
        if (favor) {
            throw new global.errs.LikeException()
        }
        // 事务,一定别忘了return
        return db.transaction(async t => {
            await Favor.create({
                art_id,
                type,
                uid
            }, {
                transaction: t
            })
            const art = await Art.getData(art_id, type, false)
            await art.increment('fav_nums', {
                by: 1,
                transaction: t
            })
        })
    }

    static async Dislike(uid, art_id, type) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                uid,
                type
            }
        })
        if (!favor) {
            throw new global.errs.DisLikeException()
        }
        return db.transaction(async t => {
            // Favor是模型可以理解为表，小写是表中的某一条记录
            await favor.destroy({
                force: true, // false 软删除，true 物理删除
                transaction: t
            })
            const art = await Art.getData(art_id, type, false)
            await art.decrement('fav_nums', {
                by: 1,
                transaction: t
            })
        })
    }

    static async LikeStatus(uid, art_id, type) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                uid,
                type
            }
        })
        return favor ? true : false
    }

    static async getFavor(uid) {
        const arts = await Favor.findAll({
            uid,
            type: {
                [Op.not]: 400
            }
        })
        if(!arts) {
            throw new global.errs.NotFound()
        }
        // 初步组装要查询的数据
        const types = []
        for (let art of arts) {
            const currentType = art.type
            const currentArtId = art.art_id
            const findType = types.find(item => item.type === currentType)
            if(!findType) {
                types.push({type: currentType, ids: [currentArtId]})
            } else {
                findType.ids.push(currentArtId)
            }
        }
        return types
    }
}

Favor.init({
    uid: DataTypes.INTEGER,
    art_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER
}, {
    tableName: 'favor',
    sequelize: db
})

module.exports = {
    Favor
}
