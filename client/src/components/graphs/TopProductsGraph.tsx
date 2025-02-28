import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Legend, ArcElement } from "chart.js";

ChartJs.register(Tooltip, Legend, ArcElement);
ChartJs.defaults.font.size = 13;

export const TopProductsGraph = () => {
  const pieChartData = {
    labels: ["Latum", "Bearbrand", "Ambot Ni"],
    datasets: [
      {
        label: "Quantity",
        data: [12, 33, 8],
        backgroundColor: ['#0a0a5d', '#124e73', '#2b4150'],
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
