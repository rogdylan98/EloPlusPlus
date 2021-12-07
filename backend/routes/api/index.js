const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionRouter = require('./questions.js');
router.use('/session', sessionRouter);
router.use('/question', questionRouter);
router.use('/users', usersRouter);


// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

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

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

module.exports = router;
