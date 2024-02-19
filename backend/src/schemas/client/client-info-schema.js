const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientInfoSchema = new Schema(
  {
    organization: {
      type: String,
      required: true,
    },
    time_zone: {
      type: String,
      required: true,
    },    
    language: {
      type: Array,
      required: true,
    }
  },
  { collection: false }
);

module.exports = { clientInfoSchema };
