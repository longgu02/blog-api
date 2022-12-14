require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
var cors = require('cors');

// const usersRouter = require('./src/routes/users.router')
// const postRouter = require('./src/routes/post.router')
const routes = require('./src/routes')
const _authRouter = require('./src/_auth/_auth.router')

const app = express()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas.')
  })
  .catch((err) => {
    console.log('Error occurred connecting to MongoDB Atlas', err)
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(cors());

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/users', usersRouter)
// app.use('/posts', postRouter)
routes.map((route) => {
  app.use(route.path, route.router);
})
app.use('/auth', _authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
