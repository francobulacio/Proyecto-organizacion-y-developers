const { DevModel } = require('../../models/dev/dev-model');

//get all profiles
const ProfilesController = async (req, res) => {
  try {
    const Devs = await DevModel.find().populate('currentTeam');
    return res.send(Devs);
  } catch (error) {
    return res.status(400).send('NO Devs found');
  }
};

//get one profile
const ProfileController = async (req, res) => {
  const { id } = req.params;

  try {
    const Devs = await DevModel.findById(id);
    return res.send(Devs);
  } catch (error) {
    return res.status(400).send('NO Devs found');
  }
};

//update profile
const UpdateController = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await DevModel.findById(id);
  } catch (error) {
    return res.status(400).send('No Dev found');
  }

  const {
    name,
    email,
    password,
    role,
    avatar,
    social,
    info,
    isDev,
    currentTeam,
    oldTeams,
    stack,
  } = req.body;
  if (
    !name &&
    !email &&
    !password &&
    !role &&
    !avatar &&
    !social &&
    !info &&
    !stack &&
    !isDev &&
    !currentTeam &&
    oldTeams
  )
    return res.status(400).send('Error. empty body request');

  const filter = req.params;
  const update = req.body;

  const Dev = await DevModel.findOneAndUpdate(filter, update);

  return res.send('Dev updated succesfully');
};

//delete profile
const DeleteController = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await DevModel.findById(id);
  } catch (error) {
    return res.status(400).send('No Dev found');
  }

  const Devs = await DevModel.findOneAndDelete(id);
  return res.send('Dev deleted succesfully');
};

module.exports = {
  ProfilesController,
  ProfileController,
  UpdateController,
  DeleteController,
};
