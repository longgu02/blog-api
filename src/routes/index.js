const postRouter = require('./post.router')
const usersRouter = require('./users.router')

module.exports = [
  {
    path: '/api/v1/posts',
    router: postRouter,
  },
  { path: '/api/v1/users', router: usersRouter },
]
