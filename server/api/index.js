
const router = require('koa-router')()

const domain = require('./demos/domain')
const role = require('./demos/role')
const user = require('./demos/user')
const menu = require('./demos/menu')
const role_menuMid = require('./demos/role_menuMid')
const session = require('./demos/session')
const login = require('./demos/login')

// api
router.use('/domain', domain)
router.use('/role', role)
router.use('/user', user)
router.use('/menu', menu)
router.use('/role_menuMid', role_menuMid)
router.use('/session', session)
router.use('/login', login)

module.exports = router.routes()