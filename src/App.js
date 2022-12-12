import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
const API = "https://api.coingecko.com/api/v3/";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchMarketData();
  }, []);

  //Gets Market data
  async function fetchMarketData() {
    const res = await fetch(
      `${API}coins/markets?vs_currency=inr&order=market_cap_desc&per_page=20&page=1&sparkline=false`
    );
    const data = await res.json();
    setData(data);
  }

  return (
    <div className="App">
      <Navbar />
      <div className="data">
        <p className="main">Cryptocurrency Prices by Market Cap </p>
        <table className="tableData">
          <thead>
            <tr>
              <th></th>
              <th>Coin</th>
              <th>Price (INR)</th>
              <th>Market Cap</th>
              <th>Price change %</th>
            </tr>
          </thead>

          {data?.length > 0 ? (
            <tbody>
              {data.map((coin) => (
                <tr key={coin.id}>
                  <td>
                    <img src={coin.image} alt="logo"></img>
                  </td>
                  <td>{coin.name}</td>
                  <td>{coin.current_price}</td>
                  <td>{coin.market_cap}</td>
                  <td>{coin.price_change_percentage_24h}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="empty">
              <h3>NO DATA PROVIDED</h3>
            </div>
          )}
        </table>
      </div>
    </div>
  );
}

export default App;
