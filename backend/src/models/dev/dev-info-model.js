const mongoose = require("mongoose");
const { devInfoSchema } = require("../../schemas/dev/dev-info-schema");

const DevInfoModel = mongoose.model("DevInfo", devInfoSchema);

module.exports = { DevInfoModel };
