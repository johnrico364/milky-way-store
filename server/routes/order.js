const express = require("express");
const Controllers = require("../controllers/orderControllers");
const DashboardControllers = require("../controllers/dashboardController");

const router = express.Router();

router.post("/new-order", Controllers.orderProduct); // user order product

router.get("/cart/:ordered_by", Controllers.getUserCarts); //user carts

router.post("/checkout-cart", Controllers.checkoutCartedProducts); //user carts

router.delete("/cancel-order/:id", Controllers.cancelOrder); // user carts

router.post("/get-by-status", Controllers.getUserOrderByStatus); //user profile

router.get("/to-ship", Controllers.getToShipOrders); //admin orders

router.patch("/update-status", Controllers.updateOrderStatus);

// ====================== DASHBOARD =======================

router.get(
  "/dashboard/get-past-7days-sales",
  DashboardControllers.getPast7DaysSales
);
router.get(
  "/dashboard/get-top3-products",
  DashboardControllers.getTopThreeProducts
);
router.get("/dashboard/get-stocks", DashboardControllers.getProductStocks);

module.exports = router;
