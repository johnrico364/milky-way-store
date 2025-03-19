import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useGetPast7Days } from "../../hooks/dashboard/useGetPast7Days";
import { useEffect, useState } from "react";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJs.defaults.font.size = 14;

export const SalesGraph = () => {
  const { getPastSevenDaysSales } = useGetPast7Days();

  const [labels, set_labels] = useState<string[]>([]);
  const [sales, set_sales] = useState<number[]>([]);

  const effectSales = async () => {
    const response = await getPastSevenDaysSales();

    if (response) {
      set_labels(response.data?.labels);
      set_sales(response.data?.sales);
    }
  };

  useEffect(() => {
    effectSales();
  }, []);

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "Sales of the Past 7 Days",
        data: sales,
        backgroundColor: "cyan",
        borderColor: "#124e73",
      },
    ],
  };

  return (
    <>
      <Line options={{ responsive: true }} data={lineChartData} />
    </>
  );
};
