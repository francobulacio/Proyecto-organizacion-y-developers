const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  devs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dev",
      require: false,
    },
  ],
  language: {
    type: Array,
  },
  stack: {
    type: String,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  time_zone: {
    type: Array,
  },
  working: {
    type: Boolean,
    default: false,
  },
  availability: {
    type: String,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = { teamSchema };
