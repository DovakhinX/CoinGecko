import React from "react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Chart({ info }) {
  return <Bar data={info} />;
}

export default Chart;
