const passport = require('passport');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DevModel } = require('../../models/dev/dev-model');
const teamsIncomplete = require('../../utils/algorithm');

//register
const RegisterController = async (req, res) => {
  try {
    const {
      name,
      surname,
      email,
      password,
      role,
      avatar,
      social,
      info,
      stack,
      //oldTeams,
    } = req.body;

    if (!surname || !role || !social || !info)
      return res.status(400).send('Missing fields');

    const checkEmail = await DevModel.find({ email: email });
    if (checkEmail.length > 0)
      return res.status(400).send('Email is already registered');

    //hashear password
    const hashPassword = await bcryptjs.hash(password, 8);

    //guardar dev registrado
    const newDev = new DevModel({
      name,
      surname,
      email,
      password: hashPassword,
      role,
      avatar,
      social,
      info,
      stack,
      //oldTeams,
    });

    //guardar dev en BBDD
    const dev = await newDev.save();

    //ALGORITMO que asigna dev a un team
    const assignTeam = await teamsIncomplete(dev);

    try {
      dev.currentTeam = assignTeam;
      await dev.save();
    } catch (error) {
      console.log(error);
    }

    //datos a encriptar con jwt
    const body = {
      _id: dev._id,
      email: dev.email,
    };

    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
      expiresIn: '45m',
    });

    return res.send({
      message: 'Dev registered succesfully',
      token: 'Bearer' + ' ' + token,
      dev,
    });
  } catch (error) {
    return res.status(400).send('Error in register');
  }
};

//login
const LoginController = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (!user) {
        return res.status(404).json(info);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);

        //datos a encriptar con jwt
        const body = {
          _id: user._id,
          email: user.email,
        };

        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: '45m',
        });
        res.json({
          message: info.message,
          token: 'Bearer' + ' ' + token,
          user,
        });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

module.exports = { RegisterController, LoginController };
