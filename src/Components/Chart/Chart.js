import React, { useState, useEffect } from "react";
import "./Chart.css";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios";
import { useLocation } from "react-router-dom";

const API = "https://api.coingecko.com/api/v3/";

function Chart() {
  const location = useLocation();
  let term = location.state.id;
  const [coinChart, setCoinChart] = useState([]);

  const chartData = () => {
    if (Object.hasOwn(coinChart, "message")) {
      return {
        labels: "Sorry",
        datasets: [
          {
            label: "Price Variation",
            data: "",
            backgroundColor: ["red", "blue"],
          },
        ],
      };
    } else {
      return {
        labels: coinChart.map((item) => new Date(item[0]).getFullYear()),
        datasets: [
          {
            label: "Price Variation",
            data: coinChart.map((item) => item[1]),
            backgroundColor: ["red", "blue"],
          },
        ],
      };
    }
  };

  useEffect(() => {
    fetchData();
  }, [term]);

  const fetchData = () => {
    axios
      .get(
        `${API}coins/${location.state.id}/market_chart?vs_currency=inr&days=max&interval=daily`
      )
      .then((res) => {
        setCoinChart(res.data.prices);
      })
      .catch((err) => {
        setCoinChart(err);
      });
  };

  return (
    <div className="charting">
      <h3> Price Chart</h3>

      <Bar data={chartData()} />
    </div>
  );
}

export default Chart;
