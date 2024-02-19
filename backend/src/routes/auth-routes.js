const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authRoutes = Router();

authRoutes.get(
  '/github',
  passport.authenticate('github', { scope: ['read:user', 'user:email'] }),
  function (req, res) {}
);

authRoutes.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/fail',
    session: false,
  }),
  function (req, res) {
    const body = {
      reqQueryCode: req.query.code,
    };

    const token = jwt.sign({ auth: body }, process.env.JWT_SECRET, {
      expiresIn: '45m',
    });
    res.redirect(
      'open2work://' +
        token +
        ';' +
        req.user.displayName +
        ';' +
        req.user.photos[0].value
    );
  }
);

authRoutes.get(
  '/linkedin',
  passport.authenticate('linkedin', {
    state: 'SOME STATE',
    scope: ['r_emailaddress', 'r_liteprofile'],
  }),
  function (req, res) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  }
);

authRoutes.get('/linkedin/callback', (req, res, next) => {
  passport.authenticate('linkedin', (err, user, info) => {
    if (err) {
      // failureRedirect
      return res.redirect('/auth/fail');
    }

    if (!user) {
      // failureRedirect
      return res.redirect('/auth/fail');
    }

    // Note: https://github.com/jaredhanson/passport/blob/master/lib/middleware/authenticate.js#L52
    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      // successRedirect
      const body = {
        reqCode: user.id,
      };

      const token = jwt.sign({ auth: body }, process.env.JWT_SECRET, {
        expiresIn: '45m',
      });
      res.redirect(
        'open2work://' +
          token +
          ';' +
          user.displayName +
          ';' +
          user.photos[2].value
      );
    });
  })(req, res, next);
});

authRoutes.get('/fail', (req, res) => {
  res.redirect('open2work://fail');
});

module.exports = authRoutes;
