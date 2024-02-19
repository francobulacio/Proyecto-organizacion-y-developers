const mongoose = require("mongoose");
const { devSocialSchema } = require("../../schemas/dev/dev-info-schema");

const DevSocialModel = mongoose.model("DevSocial", devSocialSchema);

module.exports = { DevSocialModel };