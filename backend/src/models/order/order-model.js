const mongoose = require("mongoose");
const { orderSchema } = require("../../schemas/order/order-schema");

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = { OrderModel };
