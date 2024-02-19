const passport = require('passport');
const bcryptjs = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

var GitHubStrategy = require('passport-github2').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
//var GoogleStrategy = require('passport-google-oauth2').Strategy;

const { DevModel } = require('../../models/dev/dev-model');
const { ClientModel } = require('../../models/client/client-model');
const dotenv = require('dotenv');
dotenv.config();

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        let user = await DevModel.findOne({ email });

        if (!user) {
          user = await ClientModel.findOne({ email });
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
          if (user.orders.length > 0) {
            await user.populate('orders');
          }
        }

        const checkPasswordUser = await bcryptjs.compare(
          password,
          user.password
        );

        if (!checkPasswordUser) {
          return done(null, false, { message: 'Wrong password' });
        }

        return done(null, user, { message: 'Login successfull' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (err) {
        return next(err);
      }
    }
  )
);

/* passport.use(
  new GithubStrategy(
    {
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ oauthID: profile.id }, function (err, user) {
        if (err) {
          console.log(err); // handle errors!
        }
        if (!err && user !== null) {
          done(null, user);
        } else {
          user = new User({
            oauthID: profile.id,
            name: profile.displayName,
            created: Date.now(),
          });
          user.save(function (err) {
            if (err) {
              console.log(err); // handle errors!
            } else {
              console.log('saving user ...');
              done(null, user);
            }
          });
        }
      });
    }
  )
);
*/
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: 'http://127.0.0.1:8080/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(() => {
        return done(null, profile);
      });
    }
  )
);

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LD_CLIENT_ID,
      clientSecret: process.env.LD_SECRET,
      callbackURL: 'http://127.0.0.1:8080/auth/linkedin/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's LinkedIn profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the LinkedIn account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);

/*
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOne({ oauthID: profile.id }, function (err, user) {
        if (err) {
          console.log(err); // handle errors!
        }
        if (!err && user !== null) {
          done(null, user);
        } else {
          user = new User({
            oauthID: profile.id,
            name: profile.displayName,
            created: Date.now(),
          });
          user.save(function (err) {
            if (err) {
              console.log(err); // handle errors!
            } else {
              console.log('saving user ...');
              done(null, user);
            }
          });
        }
      });
    }
  )
); */

const validateToken = passport.authenticate('jwt', { session: false });

/*
passport.use(new JWTStrategy({ 
    secretOrKey: "JWT_SECRET",
    jwtFromRequest: ExtractJWT.fromAuthHeader("SECRET_TOKEN")
}, async (token, done) => {
  try {
    return done(null, token.user)
  } catch (err) {
    return next(err)
  }
}
))
*/

module.exports = { validateToken };
