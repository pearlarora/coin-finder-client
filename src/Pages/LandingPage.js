import React, { useEffect, useState } from "react";
import CoinTable from "../Components/Table.js";
import { Container } from "@mui/material";
import AdGrid from "../Components/AdGrid.js";
import AdBanner from "../Components/AdBanner.js";
import axios from "axios";
import { base_url } from "../Constants.js";

function LandingPage() {
  const [promotedCoins, setPromotedCoins] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const [promotedRes, coinsRes] = await Promise.all([
          axios.get(`${base_url}promoted`),
          axios.get(`${base_url}coins`),
        ]);
        setPromotedCoins(promotedRes.data);
        setCoins(coinsRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins:", error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div>
      <Container
        maxWidth="xl"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {/* <AdBanner /> */}
        <AdGrid />
        <CoinTable
          heading="Promoted Coins"
          coins={promotedCoins}
          setCoins={setPromotedCoins}
          loading={loading}
        />
        <AdGrid />
        <CoinTable
          heading="Coins"
          coins={coins}
          setCoins={setCoins}
          loading={loading}
        />
      </Container>
    </div>
  );
}

export default LandingPage;
