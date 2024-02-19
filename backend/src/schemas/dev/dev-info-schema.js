const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const devInfoSchema = new Schema(
  {
    time_availability: {
      type: String,
      required: true,
    },
    time_zone: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    language: {
      type: Array,
      required: true,
    }
  },
  { collection: false }
);

module.exports = { devInfoSchema };
