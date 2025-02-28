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
import { useGetPast7Days } from "../../hooks/useGetPast7Days";

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
  const [get] = useGetPast7Days();

  const lineChartData = {
    labels: get,
    datasets: [
      {
        label: "Sales of the Past 7 Days",
        data: [1000, 2000, 3000, 2444, 6700, 7676, 6000, 222, 10333],
        backgroundColor: "cyan",
        borderColor: "#124e73",
      },
    ],
  };

  return (
    <>
      <Line options={{responsive: true}} data={lineChartData} />
    </>
  );
};
