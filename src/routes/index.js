const postRouter = require('./post.router')
const usersRouter = require('./users.router')

module.exports = [
  {
    path: '/posts',
    router: postRouter,
  },
  { path: '/users', router: usersRouter },
]
