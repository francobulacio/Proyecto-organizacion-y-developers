const { Router } = require('express');
const controllers = require('../controllers');
const { validateToken } = require('../middlewares/auth/passport');

const teamRoutes = Router();

//create team
teamRoutes.post('/register', controllers.authTeam.teamRegisterController);

//get All team profiles
teamRoutes.get(
  '/profile',
  // validateToken,
  controllers.team.teamProfilesController
);

//get team profile by ID
teamRoutes.get(
  '/profile/:id',
  // validateToken,
  controllers.team.teamProfileController
);

module.exports = teamRoutes;
