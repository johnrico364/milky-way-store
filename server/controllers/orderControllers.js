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
  let query;

  try {
    switch (status) {
      case "to-approve":
        query = {
          ordered_by,
          isCarted: false,
          isConfirmed: false,
        };
        break;
      case "to-ship":
        query = {
          ordered_by,
          isCarted: false,
          isConfirmed: true,
        };
        break;

      case "history":
        query = {
          ordered_by,
          isCarted: false,
          isConfirmed: true,
          isDelivered: true,
        };
        break;

      default:
        return res.status(400).json({ error: "Invalid Status" });
    }
    const orders = await Order.find(query)
      .populate("product")
      .sort({ updatedAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllDeliveryByStatus = async (req, res) => {
  const status = req.params.status;

  try {
    let query = {
      isCarted: false,
      isConfirmed: false,
      isDelivered: false,
    };
    switch (status) {
      case "pending":
        query.isConfirmed = false;
        break;
      case "delivery":
        query.isConfirmed = true;
        break;
      case "history":
        query.isConfirmed = true;
        query.isDelivered = true;
        break;
    }

    const orders = await Order.find(query)
      .populate({
        path: "product",
        select: "name price",
      })
      .populate({
        path: "ordered_by",
        select: "fname lname",
      })
      .sort({ updatedAt: -1 });

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

module.exports = {
  orderProduct,
  getUserCarts,
  getOneOrder,
  checkoutCartedProducts,
  cancelOrder,
  getUserOrderByStatus,
  getAllDeliveryByStatus,
  updateApproveStatus,
  updateDeliveryStatus,
};
