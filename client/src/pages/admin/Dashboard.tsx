import { useEffect, useState } from "react";
import { SalesGraph } from "../../components/graphs/SalesGraph";
import { TopProductsGraph } from "../../components/graphs/TopProductsGraph";
import { ProductStocks } from "../../components/graphs/ProductStocks";
import { OrderHistoryDetails } from "../../components/OrderHistoryDetails";

export const Dashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <div className="basis-11/12 mt-3">
        <div className="dashboard-title mb-3">Admin Dashboard</div>
        <div className="info-card-container">
          <div className="info-card">
            <div className="title">Pending Orders</div>
            <div className="value">122</div>
          </div>
          <div className="info-card">
            <div className="title">Total Users</div>
            <div className="value">134</div>
          </div>
          <div className="info-card">
            <div className="title">Products</div>
            <div className="value">21</div>
          </div>
          <div className="info-card">
            <div className="title">Today Sales</div>
            <div className="value">23 %</div>
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

        <div className="all-transaction-container">
          <div className="transac-title w-full">Transactions History</div>
          <div className="grid lg:grid-cols-2 gap-3 p-4 ">
            <OrderHistoryDetails />
            <OrderHistoryDetails />
            <OrderHistoryDetails />
            <OrderHistoryDetails />
          </div>
        </div>
      </div>
    </div>
  );
};
