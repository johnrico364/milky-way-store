import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { SalesGraph } from "../../components/graphs/SalesGraph";
import { TopProductsGraph } from "../../components/graphs/TopProductsGraph";
import { ProductStocks } from "../../components/graphs/ProductStocks";

import { useGetDashboardSummary } from "../../hooks/dashboard/useGetDashboardSummary";

export const Dashboard = () => {
  const { getDashboardSummary } = useGetDashboardSummary();

  const defaultData = {
    pendingOrders: 0,
    products: 0,
    users: 0,
    todaySales: 0,
  };
  const [summary, set_summary] = useState(defaultData);

  const dashboardEffect = async () => {
    const response = await getDashboardSummary();
    set_summary(response);
  };

  useEffect(() => {
    dashboardEffect();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <div className="basis-11/12 mt-3">
        <div className="dashboard-title mb-3">Admin Dashboard</div>
        <div className="info-card-container">
          <div className="info-card">
            <div className="title">Pending Orders</div>
            <div className="value">{summary.pendingOrders}</div>
          </div>
          <div className="info-card">
            <div className="title">Total Users</div>
            <div className="value">{summary.users}</div>
          </div>
          <div className="info-card">
            <div className="title">Products</div>
            <div className="value">{summary.products}</div>
          </div>
          <div className="info-card">
            <div className="title">Today Sales</div>
            <div className="value">
              {summary.todaySales > 0 ? <div className="text-green-500">
                {summary.todaySales} % <FaArrowUp className="inline" />
              </div>: <div className="text-red-500">
                {summary.todaySales} % <FaArrowDown className="inline" />
              </div>}           
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-5">
          <div className="lg:basis-7/12 basis-full flex justify-center graph">
            <div className="basis-10/12">
              <SalesGraph />
            </div>
          </div>
          <div className="lg:basis-4/12 basis-full flex justify-center graph">
            <div className="basis-8/12">
              <TopProductsGraph />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center bar-graph">
          <div className="basis-8/12">
            <ProductStocks />
          </div>
        </div>
      </div>
    </div>
  );
};
