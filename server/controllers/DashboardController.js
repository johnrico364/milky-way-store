const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");
const User = require("../models/userSchema");
const moment = require("moment");

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
    const productData = await Product.find({ isDeleted: false }).select(
      "name stocks"
    );

    const productNames = productData.map((product) => product.name);
    const productStocks = productData.map((product) => product.stocks);
    res.status(200).json({ names: productNames, stocks: productStocks });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDashboardSummary = async (req, res) => {
  const todayStart = moment().startOf("day").toDate();
  const todayEnd = moment().endOf("day").toDate();
  const yesterdayStart = moment().subtract(1, "day").startOf("day").toDate();
  const yesterdayEnd = moment().subtract(1, "day").endOf("day").toDate();
  try {
    const pendingOrders = await Order.countDocuments({
      isCarted: false,
      isConfirmed: false,
    });
    const users = await User.countDocuments({ isAdmin: false });
    const products = await Product.countDocuments();

    const todaySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: todayStart, $lte: todayEnd },
          isDelivered: true,
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$payment" },
        },
      },
    ]);

    const yesterdaySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmount" },
        },
      },
    ]);

    const todayTotal = todaySales.length > 0 ? todaySales[0].totalSales : 0;
    const yesterdayTotal =
      yesterdaySales.length > 0 ? yesterdaySales[0].totalSales : 0;

    // Calculate the percentage change
    let percentageChange = 0;
    if (yesterdayTotal !== 0) {
      percentageChange = ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100;
    } else if (todayTotal > 0) {
      percentageChange = 100; // If yesterday had no sales but today has sales, it's a 100% increase
    }

    console.log(`Yesterday's Sales: $${yesterdayTotal}`);
    console.log(`Today's Sales: $${todayTotal}`);
    console.log(`Sales Change: ${percentageChange.toFixed(2)}%`);

    res.status(200).json({ pendingOrders, users, products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPast7DaysSales,
  getTopThreeProducts,
  getProductStocks,
  getDashboardSummary,
};
