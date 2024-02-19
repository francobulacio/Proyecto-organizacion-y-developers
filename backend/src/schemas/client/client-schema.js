const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { clientInfoSchema } = require("./client-info-schema");
const { clientSocialSchema } = require("./client-social-schema");

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  },
  isDev:{
    type: Boolean,
    default: false
  },
  social: clientSocialSchema,
  info: clientInfoSchema,
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: false,
  },
  isDev: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

module.exports = { clientSchema };
