const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routes');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const multer = require('multer');

//basic config
dotenv.config();

//start app and define port
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(cors());

//passport
app.use(passport.initialize());
require('./middlewares/auth/passport.js');

//multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + path.extname(file.originalname));
  },
});

app.use(multer({ storage }).single('image'));

//routes
app.use('/dev', routers.dev);
app.use('/client', routers.client);
app.use('/team', routers.team);
app.use('/order', routers.order);
app.use('/img', routers.img);
app.use('/auth', routers.auth);
app.use('/', routers.login);

//test home
app.get('/', (req, res) => {
  res.status(200).send('Working');
});

//start server and DB
const boot = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'react-native' });

  app.listen(PORT, () => {
    console.log(
      `Running on http://localhost:${PORT} \nDB connected succesfully`
    );
  });
};

boot();
