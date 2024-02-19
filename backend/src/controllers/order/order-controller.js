const { ClientModel } = require("../../models/client/client-model");
const { OrderModel } = require("../../models/order/order-model");
const { TeamModel } = require("../../models/team/team-model");

const createOrder = async (req, res) => {
  try {
    const { client, team, description } = req.body;

    if (!client || !team || !description) return res.status(400).send();

    const newOrder = new OrderModel({
      client,
      team,
      description,
    });

    await newOrder.save();

    const Team = await TeamModel.findByIdAndUpdate(
      { _id: team },
      { $push: { orders: newOrder._id } },
      { runValidators: true, returnDocument: "after" }
    ).exec();

    await Team.save();

    const Client = await ClientModel.findByIdAndUpdate(
      { _id: client },
      { $push: { orders: newOrder._id } },
      { runValidators: true, returnDocument: "after" }
    ).exec();

    await Client.save();

    return res.send("Order registered succesfully");
  } catch (error) {
    console.log("error detected");
  }
};

const updateOrder = async (req, res) => {
  //id order
  const { id } = req.params;
  const { dev, ok } = req.body;


  //buscar order por id
  try {
    const Order = await OrderModel.findById(id);
    if (Order === null) {

      return res.status(400).send("No Order found");
    }
    if (ok) {
      Order.devs_ok.push(dev);
    } else {
      Order.devs_not.push(dev)
    }

    await Order.save();
    return res.status(200).send("Order updated")
    
  } catch (error) {
    console.log(error)
    return res.status(400).send(error);
  }
};

module.exports = { createOrder, updateOrder };
