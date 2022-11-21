const express = require('express')
const moongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./authRouter')



require('dotenv').config()
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

const app = express()
app.use(express.json())
app.use(cors())
app.use('', authRouter)


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

const start = async() => {
    try {
        await moongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log(`server runs on port ${PORT}`)
        })
    } catch (error) {
        console.log('error', error)
    }
}

start()
