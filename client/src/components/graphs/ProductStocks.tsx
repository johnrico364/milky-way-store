import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetProductStocks } from "../../hooks/dashboard/useGetProductStocks";
import { useEffect, useState } from "react";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJs.defaults.font.size = 12;

export const ProductStocks = () => {
  const { getProductStocks } = useGetProductStocks();

  const [names, set_names] = useState<string[]>([]);
  const [stocks, set_stocks] = useState<number[]>([]);

  const effectStocks = async () => {
    const response = await getProductStocks();
    set_names(response?.names);
    set_stocks(response?.stocks);
  };

  useEffect(() => {
    effectStocks();
  }, []);

  const barChartData = {
    labels: names,
    datasets: [
      {
        label: "Product Stocks",
        data: stocks,
        backgroundColor: ["#0a0a5d", "#124e73", "#2b4150"],
      },
    ],
  };

  return (
    <>
      {" "}
      <Bar options={{}} data={barChartData} />
    </>
  );
};
