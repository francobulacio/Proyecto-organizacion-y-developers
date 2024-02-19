const mongoose = require("mongoose");
const { clientSchema } = require("../../schemas/client/client-schema");

const ClientModel = mongoose.model("Client", clientSchema);

module.exports = { ClientModel };
