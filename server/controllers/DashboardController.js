const { trusted } = require("mongoose");
const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");

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

const getTopThreeProducts = async (req, res) => {
  try {
    const topThree = await Order.aggregate([
      {
        $match: {
          isDelivered: true,
        },
      },
      {
        $group: {
          _id: "$product",
          totalPayment: { $sum: "$payment" },
        },
      },
      { $sort: { totalPayment: -1 } },
      { $limit: 3 },
    ]);

    const topThreeNames = await Promise.all(
      topThree.map(async (order) => {
        const orderData = await Product.findById(order?._id).select("name");
        return orderData.name;
      })
    );
    const topThreeSales = topThree.map((order) => order?.totalPayment);

    res.status(200).json({ sales: topThreeSales, names: topThreeNames });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductStocks = async (req, res) => {
  try {
    const productData = await Product.find({isDeleted: false}).select('name stocks');

    res.status(200).json(productData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPast7DaysSales,
  getTopThreeProducts,
  getProductStocks
};
