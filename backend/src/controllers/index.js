const authDev = require("./dev/dev-auth-controller");
const dev = require("./dev/dev-controller");
const authClient = require("./client/client-auth-controller");
const client = require("./client/client-controller");
const authTeam = require("./team/team-register-controller");
const team = require("./team/team-profiles-controller");
const order = require("./order/order-controller");
const img = require("./img/img-controller");

module.exports = { authDev, dev, authClient, client, authTeam, team, order, img };
