const mongoose = require("mongoose");
const { clientSocialSchema } = require("../../schemas/client/client-social-schema");

const ClientSocialModel = mongoose.model("ClientSocial", clientSocialSchema);

module.exports = { ClientSocialModel };