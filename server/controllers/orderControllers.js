const Order = require("../models/orderSchema");

const orderProduct = async (req, res) => {
  const orderForm = await req?.body;

  try {
    const orderExist = await Order.findOne({
      ordered_by: orderForm?.ordered_by,
      product: orderForm?.product,
      isCarted: true,
      isConfirmed: false,
      isDelivered: false,
    });

    if (orderExist && orderForm?.isCarted) {
      const newOrderForm = {
        quantity: orderExist?.quantity + orderForm?.quantity,
        payment: orderExist?.payment + orderForm?.payment,
      };
      const orderUpdate = await Order.findByIdAndUpdate(
        orderExist?._id,
        newOrderForm
      );

      res
        .status(200)
        .json({ message: "This order is already existing", response: "cart" });
    } else {
      const data = await Order.create({
        ...orderForm,
        isConfirmed: false,
        isDelivered: false,
      });

      res.status(200).json({
        message: "Order created successfully",
        response: orderForm.isCarted ? "cart" : "profile",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserCarts = async (req, res) => {
  const ordered_by = req.params.ordered_by;

  try {
    const carts = await Order.find({
      ordered_by: ordered_by,
      isCarted: true,
    }).populate("product");

    res.status(200).json({ carts: carts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneOrder = async (req, res) => {
  const order_id = req.params.order_id;

  try {
    const order = await Order.findById(order_id).populate("product");

    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkoutCartedProducts = async (req, res) => {
  const cart_ids = await req?.body;

  cart_ids.map(async (id) => {
    const data = await Order.findByIdAndUpdate(id, { isCarted: false });
  });

  res.status(200).json({ response: "Carted orders checkout successfully" });

  try {
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Order.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserOrderByStatus = async (req, res) => {
  const { ordered_by, status } = await req.body;

  try {
    let orders;

    switch (status) {
      case "to-approve":
        orders = await Order.find({
          ordered_by,
          isCarted: false,
          isConfirmed: false,
        }).populate("product");
        break;

      case "to-ship":
        orders = await Order.find({
          ordered_by,
          isCarted: false,
          isConfirmed: true,
        }).populate("product");
        break;

      case "history":
        orders = await Order.find({
          ordered_by,
          isCarted: false,
          isConfirmed: true,
          isDelivered: true,
        }).populate("product");
        break;

      default:
        return res.status(400).json({ error: "Invalid Status" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPendingOrDeliveryOrders = async (req, res) => {
  const status = req.params.status;

  try {
    let query = {
      isCarted: false,
      isConfirmed: null,
      isDelivered: false,
    };
    if (status === "pending") query.isConfirmed = false;
    if (status === "delivery") query.isConfirmed = true;

    const orders = await Order.find(query)
      .populate({
        path: "product",
        select: "name price",
      })
      .populate({
        path: "ordered_by",
        select: "fname lname",
      });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateApproveStatus = async (req, res) => {
  const { status, order } = req?.body;

  try {
    let response;
    switch (status) {
      case "approve":
        response = await Order.approve(order);
        res.status(200).json({ mess: response });
        break;
      case "decline":
        response = await Order.decline(order);
        res.status(200).json({ mess: response });
        break;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDeliveryStatus = async (req, res) => {
  const { order_id } = req.body;
  try {
    await Order.findByIdAndUpdate(order_id, { isDelivered: true });

    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTransactionHistory = async (req, res) => {
  try {
    const orders = await Order.find({ isDelivered: true });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  orderProduct,
  getUserCarts,
  getOneOrder,
  checkoutCartedProducts,
  cancelOrder,
  getUserOrderByStatus,
  getPendingOrDeliveryOrders,
  updateApproveStatus,
  updateDeliveryStatus,
  getTransactionHistory,
};
