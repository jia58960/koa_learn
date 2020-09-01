const {
    Sentence,
    Music,
    Movie
} = require('./classic')
class Art {
    static async getData(art_id, type) {
        const finder = {
            id: art_id
        }
        let art = null
        switch (type) {
            case 100: // type100为movie类型
                art = await Movie.scope('bh').findOne(finder)
            break;
            case 200:
                art = await Music.scope('bh').findOne(finder)
            break;
            case 300:
                art = await Sentence.scope('bh').findOne(finder)
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