import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";
import { useGetTop3Products } from "../../hooks/dashboard/useGetTop3Products";
import { useEffect, useState } from "react";

ChartJs.register(Tooltip, Legend, ArcElement);
ChartJs.defaults.font.size = 12;

export const TopProductsGraph = () => {
  const { getTop3Products } = useGetTop3Products();
  const [sales, set_sales] = useState([]);
  const [names, set_names] = useState([]);

  const effectSales = async () => {
    const response = await getTop3Products();
    set_sales(response?.sales);
    set_names(response?.names);
  };

  useEffect(() => {
    effectSales();
  }, []);

  const pieChartData = {
    labels: names,
    datasets: [
      {
        label: "Total Sales",
        data: sales,
        backgroundColor: ["#0a0a5d", "#124e73", "#2b4150"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <Pie
        options={{
          responsive: true,
          plugins: {
            title: { display: true, text: '"Top 3 Best Seller Products"' },
          },
        }}
        data={pieChartData}
      />
    </>
  );
};
