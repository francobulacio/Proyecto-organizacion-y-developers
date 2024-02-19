const mongoose = require("mongoose");
const { devSchema } = require("../../schemas/dev/dev-schema");

const DevModel = mongoose.model("Dev", devSchema);

module.exports = { DevModel };
