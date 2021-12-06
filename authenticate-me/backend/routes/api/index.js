const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');


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

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

module.exports = router;
