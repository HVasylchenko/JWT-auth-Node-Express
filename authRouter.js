const Router = require('express')
const controller = require('./authController')
const {check} = require('express-validator')

const router = new Router()

router.post('/signin', controller.signIn) //request for bearer token by id and password

router.post('/signup', [
    check('id', 'field id is empty').notEmpty(),
    check('password', 'field password must have from 4 to 10 letterы').isLength({min: 4, max:10})
], controller.signUp) // creation of new user
// ⁃ Fields id and password. Id - phone number or email. After signup add field `id_type` - phone or email
// ⁃ In case of successful signup - return token

router.get('/info', controller.info) // - returns user id and id type  +

router.get('/logout', controller.logout) // ] - with param `all`:
// ⁃ true - removes all users bearer tokens
// ⁃ false - removes only current token

module.exports = router

