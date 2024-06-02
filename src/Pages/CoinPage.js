import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Banner from "../Components/Banner";
import AdGrid from "../Components/AdGrid";
import AdBanner from "../Components/AdBanner";
import {
  Button,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import AdSquare from "../Components/AdSquare";
import { darker, tertiary, translucent, base_url } from "../Constants";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Divider from "@mui/material/Divider";
import GraphWidget from "../Components/GraphWidget";
import axios from "axios";
import CoinSummary from "../Components/CoinSummary";
import CoinNotFound from "../Components/CoinNotFound";

function CoinPage({ type }) {
  const navigate = new useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const { id } = useParams(); // Get the coin ID from the URL
  const { address } = useParams(); // Get the address from the URL
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response =
          type === "select"
            ? await axios.get(`${base_url}coin/${id}`)
            : await axios.get(`${base_url}search/${address}`);
        console.log("Coin Response: " + JSON.stringify(response));
        setCoin(response.data);
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id, address]);

  if (loading) {
    return <LinearProgress />;
  }

  if (!coin) {
    return <CoinNotFound />;
  }

  const handleVote = async (coinId) => {
    try {
      await axios.post(`${base_url}coins/${coinId}/vote`);
      if (coin._id === coinId) {
        setCoin({ ...coin, vote: coin.vote + 1 });
        return { ...coin, vote: coin.vote + 1 };
      }
      return coin;
    } catch (error) {
      console.error("Failed to toggle vote:", error);
    }
  };

  return (
    <Container maxWidth="xl">
      <AdBanner />
      <Grid container>
        <Grid item md={10} xs={12}>
          <Banner coin={coin} />
        </Grid>
        <Grid item md={2} xs={12}>
          {isMobile ? <AdSquare /> : <></>}
        </Grid>
      </Grid>

      <div>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <Container
              style={{
                // height: "20rem",
                backgroundColor: translucent,
                borderRadius: 20,
                marginTop: 60,
                padding: 40,
                fontSize: "1rem",
              }}
            >
              <h3>Description</h3>
              <br />
              <p style={{ lineHeight: 1.8 }}>{coin.description}</p>
            </Container>

            {coin.graph ? (
              <Container
                style={{
                  // height: "20rem",
                  backgroundColor: translucent,
                  borderRadius: 20,
                  marginTop: 20,
                  padding: 40,
                  fontSize: "1.1rem",
                }}
              >
                <h4>
                  To view the Trading Chart for {coin.name}, please visit the
                  following link:
                </h4>
                <a href={coin.link} target="_blank" rel="noopener noreferrer">
                  View {coin.name} Trading Chart
                </a>
              </Container>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item md={4} xs={12}>
            <Container
              style={{
                height: "5rem",
                backgroundColor: translucent,
                borderRadius: 20,
                marginTop: 60,
                padding: 50,
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "1rem", color: darker }}>Total Votes</p>
                <h2>{coin.vote}</h2>
              </div>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleVote(coin._id)}
              >
                <RocketLaunchIcon fontSize="small" /> &nbsp; Vote for{" "}
                {coin.name}
              </Button>
            </Container>

            <CoinSummary coin={coin} />

            <Container
              style={{
                height: "4rem",
                backgroundColor: translucent,
                borderRadius: 20,
                marginTop: 18,
                padding: 30,
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Button variant="contained" size="small">
                <TrendingUpIcon fontSize="small" /> &nbsp; Promote your Coin
                Now!
              </Button>
            </Container>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default CoinPage;
