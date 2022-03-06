const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { sequelize } = require('./models')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')
const followsRouter = require('./routes/follows')
const likesRouter = require('./routes/likes')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/follows', followsRouter)
app.use('/api/likes', likesRouter)

app.listen(3030, async()=> {
    console.log('Server up on: 3030')
    await sequelize.authenticate()
    console.log('Database connected')}
)
module.exports = app
