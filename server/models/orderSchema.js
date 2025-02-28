const mongoose = require("mongoose");
const transporter = require("../middleware/emailConfig");
const Product = require("./productSchema");
const User = require("./userSchema");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    ordered_by: { type: String, required: true },
    product: { type: String, required: true, ref: "Product" },
    quantity: { type: Number, required: true },
    payment: { type: Number, required: true },
    isCarted: { type: Boolean, required: true },
    isConfirmed: { type: Boolean, required: true },
    isDelivered: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

orderSchema.statics.approve = async function (order) {
  await this.findByIdAndUpdate(order._id, { isConfirmed: true });
  await Product.findByIdAndUpdate(order.product._id, {
    $inc: { stocks: -order.quantity },
  });

  const user = await User.findById(order.ordered_by);
  const emailMess = {
    from: {
      name: "Say Lava Logistics",
      address: process.env.USER,
    },
    to: [user.email],
    subject: "Shipped Out",
    html: `<p>
      Parcel <b>${order?._id.toUpperCase()}</b> from your order 
      ${order?.product?.name.toUpperCase()} has been shipped out.
    </p>`,
  };

  try {
    await transporter.sendMail(emailMess);
  } catch (error) {
    throw Error("Fail to send approval message!");
  }

  return { mess: "Approval message sent successfully" };
};

orderSchema.statics.decline = async function (order) {
  await this.findByIdAndDelete(order._id);

  const user = await User.findById(order.ordered_by);
  const emailMess = {
    from: {
      name: "Say Lava Logistics",
      address: process.env.USER,
    },
    to: [user.email],
    subject: "Decline Parcel",
    html: `<p>
      Parcel <b>${order?._id.toUpperCase()}</b> from your order 
      ${order?.product?.name.toUpperCase()} has been declined by 
      some company reasons.
    </p>`,
  };

  try {
    await transporter.sendMail(emailMess);
  } catch (error) {
    throw Error("Fail to send refusal message!");
  }

  return { mess: "Declining message sent successfully" };
};

module.exports = mongoose.model("Order", orderSchema);
