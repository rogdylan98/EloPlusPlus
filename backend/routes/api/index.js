const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionRouter = require('./questions.js');
const answerRouter = require('./answer.js');
router.use('/session', sessionRouter);
router.use('/question', questionRouter);
router.use('/users', usersRouter);
router.use('/answers', answerRouter);

//test errors route
router.get('/set-token-cookie', asyncHandler(async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
}));

module.exports = router;
