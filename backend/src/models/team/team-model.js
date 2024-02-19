const mongoose = require("mongoose");
const { teamSchema } = require("../../schemas/team/team-schema");

const TeamModel = mongoose.model("Team", teamSchema);

module.exports = { TeamModel };
