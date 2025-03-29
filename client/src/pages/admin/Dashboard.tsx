import { SalesGraph } from "../../components/graphs/SalesGraph";
import { TopProductsGraph } from "../../components/graphs/TopProductsGraph";
import { ProductStocks } from "../../components/graphs/ProductStocks";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
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
      </div>
    </div>
  );
};
