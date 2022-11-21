
const {validationResult} = require('express-validator')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const {secret} = require('./configJWT')
const generateAccessToken = (id, id_type) => {
    const payload = { 
        id,
        id_type
    }
    return jwt.sign(payload, secret, {expiresIn: 60 * 10} )
}

const bcrypt = require('bcrypt')
const saltRounds = +5

class authController {
    async signIn(req, res){
        try {
           const {id, password} = req.body
           const user = await User.findOne({id})
           if (!user) {
            return res.status(400).json({massage:"id not found"})
           }
           const validRPassword =  bcrypt.compareSync(password, user.password)
           if ( !validRPassword) {
            return res.status(400).json({massage:"password not correct"})
           } 
           const token = generateAccessToken(user._id, user.id_type)
            return res.json({token})
        } catch (error) {
            console.log(error)
            res.status(400).json({massage:"signIn error"})
        }
    }
    async signUp(req, res){
        try {
            const errors = validationResult(req)
            if ( !errors.isEmpty()){
               return res.status(400).json({massage:"Validation error", errors})
            }
            const {id, password} = req.body
            const candidate = await User.findOne({id})
            if ( candidate) {
                return res.status(400).json({massage:"error: id already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, saltRounds)
            let user
            if ( id.includes('@') ) {
                user = new User({id, id_type: 'email', password: hashPassword})
             }
             else {
                user = new User({id, id_type: 'phone_number', password: hashPassword})
            }
            await user.save()
            // return res.json({massage:"new user signUped succesfully"})
            user = await User.findOne({id})
            const token = generateAccessToken(user._id, user.id_type)
            return res.json({token})
        } catch (error) {
            console.log(error)
            res.status(400).json({massage:"signUp error"})
        }
    }
    async info(req, res){
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    }
    async logout(req, res){
        try {
            
        } catch (error) {
            console.log(error)            
        }
    }
}

module.exports = new authController()