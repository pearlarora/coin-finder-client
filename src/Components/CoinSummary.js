import React from "react";
import { darker, translucent } from "../Constants";
import { Container } from "@mui/material";

const CoinSummary = ({ coin }) => {
  const truncatedDate = (date) =>
    date.length > 10 ? `${date.substring(0, 10)}` : date;

  const formatDate = (inputDate) => {
    // Create a Date object from the input date
    const date = new Date(inputDate);

    // Define an array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Extract the day, month, and year from the date object
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    // Format the date as "dd Month yyyy"
    return `${day} ${month} ${year}`;
  };

  const calculateDateDifference = (inputDate) => {
    const input = new Date(inputDate);
    const today = new Date().toISOString().split("T")[0];

    const diffTime = input - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays > 0) {
      return `${diffDays} days to go`;
    } else {
      return `${Math.abs(diffDays)} days ago`;
    }
  };

  return (
    <Container
      style={{
        height: "18.5rem",
        backgroundColor: translucent,
        borderRadius: 20,
        marginTop: 18,
        padding: "35px 50px",
        fontSize: "0.8rem",
      }}
    >
      <div>
        <h3>Coin Summary</h3>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${darker}`,
            marginBottom: 10,
            paddingBottom: 10,
          }}
        >
          <p style={{ color: darker }}>Presale Start Date</p>
          <p>
            {coin.presaleStartDate
              ? formatDate(truncatedDate(coin.presaleStartDate))
              : "-"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${darker}`,
            marginBottom: 10,
            paddingBottom: 10,
          }}
        >
          <p style={{ color: darker }}>Presale End Date</p>
          <p>
            {coin.presaleEndDate
              ? formatDate(truncatedDate(coin.presaleEndDate))
              : "-"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${darker}`,
            marginBottom: 10,
            paddingBottom: 10,
          }}
        >
          <p style={{ color: darker }}>Launch Date</p>
          <p>
            {coin.launchDate
              ? calculateDateDifference(truncatedDate(coin.launchDate))
              : "TBA"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${darker}`,
            marginBottom: 10,
            paddingBottom: 10,
          }}
        >
          <p style={{ color: darker }}>Market Cap USD</p>
          <p>{coin.marketCapUsd || "-"}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ color: darker }}>24h%</p>
          <p style={coin.hours24 > 0 ? { color: "green" } : { color: "red" }}>
            {coin.hours24 ? (
              <div>
                <span>{coin.hours24 > 0 ? "+" : ""}</span>
                {coin.hours24}
                <span>%</span>
              </div>
            ) : (
              "-"
            )}
          </p>
        </div>
      </div>
    </Container>
  );
};

export default CoinSummary;
