const { TeamModel } = require("../../models/team/team-model");

const teamProfilesController = async (req, res) => {
  try {
    const Teams = await TeamModel.find();
    return res.send(Teams);
  } catch (error) {
    return res.status(400).send("NO Teams found");
  }
};

const teamProfileController = async (req, res) => {
  const { id } = req.params;
  try {
    const Teams = await TeamModel.findById(id).populate("devs");

    if(Teams.orders.length > 0)  {
      await Teams.populate("orders");
    } 
    
    return res.send(Teams);
  } catch (error) {
    return res.status(400).send("NO Teams found");
  }
};

module.exports = {
  teamProfilesController,
  teamProfileController,
};
