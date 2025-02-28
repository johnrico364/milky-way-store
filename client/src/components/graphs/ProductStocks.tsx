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

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJs.defaults.font.size = 14;

export const ProductStocks = () => {
    const barChartData = {
        labels: [
            'Lactom',
            'Bonakid',
            'Nido',
            'Bearbrand',
            'Dutch Milk'
        ], datasets: [
           { label: 'Product Stocks',
            data: [321, 321, 543, 123,90],
            backgroundColor: ['#0a0a5d', '#124e73', '#2b4150' ]
           }
        ]
    }



  return<> <Bar options={{}} data={barChartData}/></>;
};
