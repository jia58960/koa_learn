const requireDirectory = require('require-directory')
const Router = require('koa-router')

class Init {
    static initEntry(app) {
        Init.app = app
        Init.initRouter()
        Init.initHttpExp()
        Init.initConfig()
    }
    static initRouter() {
        requireDirectory(module, `${process.cwd()}/app/api`, { visit: (module) => {
            if (module instanceof Router) {
                Init.app.use(module.routes())
            }
        }})
    }
    static initHttpExp() {
        global.errs = require('./http-exception')
    }

    static initConfig() {
        global.conf = require('../config/config')
    }
}

module.exports = Init