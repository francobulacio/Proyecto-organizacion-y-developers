const passport = require("passport");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ClientModel } = require("../../models/client/client-model");

const RegisterController = async (req, res) => {
  try {
    const { name, surname, email, password, avatar, social, info } =
      req.body;

    if (!surname || !social || !info || !email || !password)
      return res.status(400).send("Missing fields");

    const checkEmail = await ClientModel.find({ email: email });
    if (checkEmail.length<0) return res.status(400).send("Email is already registered");

    const hashPassword = await bcryptjs.hash(password, 8);

    const newClient = new ClientModel({
      name,
      surname,
      email,
      password: hashPassword,
      avatar,
      social,
      info,
    });

    const client = await newClient.save();

    //datos a encriptar con jwt
    const body = {
      _id: client._id,
      email: client.email,
    };

    const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
      expiresIn: "45m",
    });

    return res.send({
      message: "Client registered succesfully",
      token: "Bearer" + " " + token,
      client,
    });
  } catch (error) {
    console.log(error)
    return res.status(400).send("Error in register");
  }
};

const LoginController = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
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
          expiresIn: "45m",
        });
        res.json({
          message: info.message,
          token: "Bearer" + " " + token,
          user,
        });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

module.exports = { RegisterController, LoginController };
