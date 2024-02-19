const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    devs_ok: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dev",
      },
    ],
    devs_not: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dev",
      },
    ],
    description: {
      type: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = { orderSchema };
