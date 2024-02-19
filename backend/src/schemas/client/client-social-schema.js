const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSocialSchema = new Schema(
  {
    linkedin: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: true,
    },
    github: {
      type: String      
    },
  },
  { collection: false }
);

module.exports = { clientSocialSchema };
