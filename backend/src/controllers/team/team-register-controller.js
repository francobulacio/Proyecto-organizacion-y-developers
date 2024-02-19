const { TeamModel } = require("../../models/team/team-model");

const teamRegisterController = async (req, res) => {
  const { devs, language, stack, time_zone, availability } = req.body;

  if (!devs || !language || !stack || !time_zone || !availability)
    return res.status(400).send();

  const newTeam = new TeamModel({
    devs,
    language,
    stack,
    time_zone,
    availability,
  });

  await newTeam.save();

  return res.send("Team registered succesfully");
};

module.exports = { teamRegisterController };
