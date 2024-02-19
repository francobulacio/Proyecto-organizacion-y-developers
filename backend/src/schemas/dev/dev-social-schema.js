const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const devSocialSchema = new Schema(
  {
    linkedin: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String
    },
    github: {
      type: String,
      required: true,
    },
  },
  { collection: false }
);

module.exports = { devSocialSchema };
