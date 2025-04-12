"use client"; // Only if using Next.js App Router

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,  } from "chart.js";

// Register required components
ChartJS.register(ArcElement, Legend,Tooltip);

const DoughnutChart : React.FC<DoughnutChartProps> =({accounts}) => {
  const labels=accounts.map((account) => account.accountName);
  const balances=accounts.map((account) => account.availableBalance);
 
  const data = {
    labels,
    datasets: [
        
      {
        label:"Accounts",
        data:balances, 
        backgroundColor: ["#006384", "#36a2eb", "#00ceff"],
        hoverBackgroundColor: ["#004d8e", "#2b91fc", "#00afff"],
        
        
      },
     
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout:'60%',
    plugins: {
      legend: {
        display: false,
      },
  },
}

  return (
    <div className="w-64 h-64">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
