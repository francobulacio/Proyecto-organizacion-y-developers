const mongoose = require("mongoose");
const { clientInfoSchema } = require("../../schemas/client/client-info-schema");

const ClientInfoModel = mongoose.model("ClientInfo", clientInfoSchema);

module.exports = { ClientInfoModel };
