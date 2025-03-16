const { trusted } = require("mongoose");
const Order = require("../models/orderSchema");

const getPast7DaysSales = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getPastSevenDays = [];
  const pastSevenDaySales = [];
  let totalSalesSum = 0;

  try {
    for (let i = 6; i >= 0; i--) {
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - i);
      pastDate.setHours(0, 0, 0, 0);

      const nextDate = new Date(pastDate);
      nextDate.setHours(23, 59, 59, 999);

      const options = {
        month: "short",
        day: "numeric",
      };
      getPastSevenDays.push(pastDate.toLocaleDateString("en-US", options));

      const sales = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: pastDate, $lte: nextDate },
            isDelivered: true,
          },
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$payment" }, // Summing the amount field
          },
        },
      ]);

      const dailySales = sales.length > 0 ? sales[0].totalSales : 0;
      pastSevenDaySales.push(dailySales);

      totalSalesSum += dailySales;
    }

    res.status(200).json({
      labels: getPastSevenDays.reverse(),
      sales: pastSevenDaySales.reverse(),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPast7DaysSales,
};
