const dev = require('./dev-routes');
const client = require('./client-routes');
const team = require('./team-routes');
const login = require('./login-routes');
const order = require('./order-routes');
const auth = require('./auth-routes');
const img = require('./img-routes');

module.exports = { dev, client, team, login, order, auth, img };
