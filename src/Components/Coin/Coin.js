import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Chart from "../Chart/Chart";
import { useLocation } from "react-router-dom";
import "./Coin.css";
const API = "https://api.coingecko.com/api/v3/";

function Coin() {
  const location = useLocation();
  let term = location.state.id;
  const [coinData, setCoinData] = useState([]);
  const [coinChart, setCoinChart] = useState([]);

  useEffect(() => {
    fetchCoin();
  }, [term]);

  useEffect(() => {
    fetchChart();
  }, [term]);

  async function fetchCoin() {
    const res = await fetch(
      `${API}coins/${location.state.id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
    );
    const data = await res.json();
    setCoinData(data);
  }

  async function fetchChart() {
    const res = await fetch(
      `${API}coins/${location.state.id}/market_chart?vs_currency=inr&days=max&interval=daily`
    );
    const data = await res.json();
    setCoinChart(data.prices);
  }

  const chartData = {
    labels: coinChart.map((item) => new Date(item[0]).getFullYear()),
    datasets: [
      {
        label: "Price Variation",
        data: coinChart.map((item) => item[1]),
        backgroundColor: ["red", "blue"],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="dis">
        {Object.hasOwn(coinData, "name") ? (
          <div className="infor">
            <div className="card">
              <div className="header">
                <img src={coinData.image.small} alt="logo" />
                <p className="coinhead">{coinData.name}</p>
              </div>
              <div className="details">
                <p className="des">{coinData.description.en}</p>
              </div>
            </div>
            <div className="quick">
              <p className="quick-head">Info</p>
              <p className="subhead">Website</p>
              <p className="datKey">Official: {coinData.links.homepage}</p>
              <p className="datKey">
                Github: {coinData.links.repos_url.github[0]}
              </p>
              <p className="subhead">Market guide</p>
              <p className="datKey">
                Market Cap Rank: {coinData.market_cap_rank}
              </p>
              <p className="datKey">
                Market Cap: {coinData.market_data.market_cap.inr}
              </p>
              <p className="datKey">
                Total Volume: {coinData.market_data.total_volume.inr}
              </p>

              <p className="subhead">Price </p>
              <p className="datKey">
                INR: {coinData.market_data.current_price.inr}
              </p>
              <p className="datKey">
                USD: {coinData.market_data.current_price.usd}
              </p>
              <p className="datKey">
                EUR: {coinData.market_data.current_price.eur}
              </p>
              <p className="subhead">Price Change (%)</p>
              <p className="datKey">
                24h: {coinData.market_data.price_change_percentage_24h}%
              </p>
              <p className="datKey">
                Week: {coinData.market_data.price_change_percentage_7d}%
              </p>
              <p className="datKey">
                Month: {coinData.market_data.price_change_percentage_30d}%
              </p>
              <p className="datKey">
                Year: {coinData.market_data.price_change_percentage_1y}%
              </p>
            </div>
          </div>
        ) : (
          <div className="empty">
            <h3>Sorry, Coudn't find the data</h3>
          </div>
        )}

        {coinChart.length < 0? (
          <div className="emp">
            <h3>Sorry, Coudn't find the data</h3>
          </div>
        ) : (
          <div className="charting">
            <h3>{coinData.name} Price Chart</h3>
            <Chart info={chartData} />
          </div>
        )}
      </div>
    </>
  );
}

export default Coin;
