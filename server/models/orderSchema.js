const mongoose = require("mongoose");
const transporter = require("../middleware/emailConfig");
const Product = require("./productSchema");
const User = require("./userSchema");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    ordered_by: { type: String, required: true, ref: "User" },
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
      name: "Milky Way E-Shop",
      address: process.env.USER,
    },
    to: [user.email],
    subject: "Shipped Out",
    html: `
      <div
        style="
          color: #e0dbdb;
          background-color: #0a0a5d;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: auto;
        "
      >
        <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px">
          Order Status Update
        </div>
        <p>Dear Customer,</p>
        <p>
          Your order ${order?.product?.name.toUpperCase()} with Order Number <strong>${order?._id.toUpperCase()}</strong> has been APPROVED.
        </p>
        <p>Thank you for shopping with us.</p>
        <p>Best regards,<br />Customer Support Team</p>
        <div style="margin-top: 20px; font-size: 12px; color: #b1aeae">
          This is an automated message. Please do not reply.
        </div>
      </div>
      `,
  };

  try {
    await transporter.sendMail(emailMess);
  } catch (error) {
    throw Error("Fail to send approval message!");
  }

  return { mess: "Approval message sent successfully" };
};

orderSchema.statics.decline = async function (order) {
  // await this.findByIdAndDelete(order._id);

  const user = await User.findById(order.ordered_by);
  const emailMess = {
    from: {
      name: "Milky Way E-Shop",
      address: process.env.USER,
    },
    to: [user.email],
    subject: "Decline Parcel",
    html: `
      <div
        style="
          color: #e0dbdb;
          background-color: #0a0a5d;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: auto;
        "
      >
        <div style="font-size: 20px; font-weight: bold; margin-bottom: 10px">
          Order Status Update
        </div>
        <p>Dear Customer,</p>
        <p>
          Your order ${order?.product?.name.toUpperCase()} with Order Number <strong>${order?._id.toUpperCase()}</strong> has been DECLINED.
        </p>
        <p>Thank you for shopping with us.</p>
        <p>Best regards,<br />Customer Support Team</p>
        <div style="margin-top: 20px; font-size: 12px; color: #b1aeae">
          This is an automated message. Please do not reply.
        </div>
      </div>
      `,
  };

  try {
    await transporter.sendMail(emailMess);
  } catch (error) {
    throw Error("Fail to send refusal message!");
  }

  return { mess: "Declining message sent successfully" };
};

module.exports = mongoose.model("Order", orderSchema);
