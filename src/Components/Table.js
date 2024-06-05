import React, { useEffect, useState } from "react";
import {
  coinTableHeader,
  lighter,
  pagination,
  pinkShade,
  primary,
  secondary,
  greyish,
  tertiary,
  translucent,
  base_url,
} from "../Constants.js";
import {
  Button,
  Chip,
  Container,
  IconButton,
  LinearProgress,
  Link,
  PaginationItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch.js";
import axios from "axios";

function CoinTable({ heading, coins, setCoins, loading }) {
  const navigate = useNavigate();
  const promoted = heading === "Promoted Coins";
  const [itemsToShow, setItemsToShow] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const truncatedDate = (date) =>
    date.length > 10 ? `${date.substring(0, 10)}` : date;

  const isCurrentDateInRange = (startDate, endDate) => {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    return currentDate >= start && currentDate <= end;
  };

  useEffect(() => {
    const initialRows = promoted ? coins.length + 2 : pagination;
    setItemsToShow(initialRows);
  }, [coins, promoted]);

  const sortedCoins = coins.sort((a, b) => b.vote - a.vote);

  const importAll = (r) => {
    let images = {};
    r.keys().forEach((key) => {
      images[key] = r(key);
    });
    return images;
  };

  const networkIcons = importAll(
    require.context("../Assets/networks", false, /\.(png|jpe?g|svg)$/)
  );

  const handleSeeMore = () => {
    setItemsToShow(itemsToShow + pagination);
  };

  // Function to get the last vote time from localStorage
  const getLastVoteTime = (coinId) => {
    return localStorage.getItem(`lastVoteTime_${coinId}`);
  };

  // Function to set the current time as the last vote time in localStorage
  const setLastVoteTime = (coinId) => {
    localStorage.setItem(`lastVoteTime_${coinId}`, new Date().toISOString());
  };

  // Function to check if the user can vote based on the last vote time
  const canVote = (coinId) => {
    const lastVoteTime = getLastVoteTime(coinId);
    if (!lastVoteTime) return true;

    const oneDayAgo = new Date(Date.now() - 60 * 60 * 1000 * 24);
    return new Date(lastVoteTime) < oneDayAgo;
  };

  const handleVote = async (coinId) => {
    if (!canVote(coinId)) {
      alert("You can only vote once per day.");
      return;
    }

    try {
      await axios.post(`${base_url}coins/${coinId}/vote`);
      const updatedCoins = coins.map((coin) => {
        if (coin._id === coinId) {
          return { ...coin, vote: coin.vote + 1 };
        }
        return coin;
      });
      setCoins(updatedCoins);
      setLastVoteTime(coinId); // Update the last vote time after voting
    } catch (error) {
      console.error("Failed to vote:", error);
    }
  };

  const handleRowClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

  return (
    <div>
      <Container maxWidth="xl" sx={{ overflowX: "hidden" }}>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: tertiary,
            border: promoted ? "1px solid #4252cb" : "null",
            boxShadow: promoted ? "0 0 20px #4252cb" : "null",
            padding: "12px 0 0 0",
            color: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              padding: "10px 20px",
              fontWeight: "500",
              letterSpacing: "1.2px",
            }}
          >
            <h3>{heading}</h3>
            <Link
              href="https://t.me/coinfinderccofficial"
              style={{
                color: pinkShade,
                fontWeight: "600",
                letterSpacing: "1px",
                fontSize: "0.8rem",
              }}
            >
              {promoted ? "Promote your coin!" : ""}
            </Link>
          </div>
          {loading ? (
            <LinearProgress />
          ) : (
            <div style={{ overflowX: "auto" }}>
              <Table style={{ minWidth: isMobile ? "650px" : "100%" }}>
                <TableHead
                  sx={{
                    backgroundColor: translucent,
                    borderBottom: "2px solid #000",
                    height: "25px",
                  }}
                >
                  <TableRow>
                    {coinTableHeader.map((head) => (
                      <TableCell
                        style={
                          head === "Coin"
                            ? { width: "25%", padding: "0 0 0 3vw" }
                            : {}
                        }
                        sx={{
                          color: "white",
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          position: head === "Coin" ? "sticky" : "static",
                          left: head === "Coin" ? 0 : "auto",
                          zIndex: head === "Coin" ? 1 : "auto",
                          backgroundColor:
                            head === "Coin" ? translucent : "inherit",
                        }}
                        key={head}
                        align={head === "Coin" ? "left" : "center"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody height="20px">
                  {sortedCoins.slice(0, itemsToShow).map((coin, index) => {
                    const networkPath = networkIcons[`./${coin.network}.png`];
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          borderBottom: "2px solid #000",
                          ":hover": {
                            backgroundColor: lighter,
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => handleRowClick(coin._id)}
                      >
                        <TableCell
                          sx={{
                            color: "white",
                            padding: "0 0 0 3vw",
                            fontSize: "1rem",
                            position: "sticky",
                            left: 0,
                            zIndex: 1,
                            backgroundColor: tertiary,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={coin.logo}
                              alt="Coin Icon"
                              height={30}
                              width={30}
                              style={{ borderRadius: "50%" }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <h5>{coin.name}</h5>
                              <p style={{ fontSize: "0.6rem" }}>
                                {coin.symbol}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontSize: "0.8rem",
                          }}
                          align="center"
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={networkPath}
                              alt="Network Icon"
                              height={20}
                              width={20}
                              style={{ borderRadius: "50%" }}
                            />
                            <span>{coin.network}</span>
                          </div>
                        </TableCell>
                        <TableCell
                          sx={{ color: "white", fontSize: "0.8rem" }}
                          align="center"
                        >
                          {coin.marketCapUsd ? (
                            coin.marketCapUsd
                          ) : coin.projectInPresale &&
                            coin.presaleStartDate &&
                            coin.presaleEndDate &&
                            isCurrentDateInRange(
                              coin.presaleStartDate,
                              coin.presaleEndDate
                            ) ? (
                            <Chip
                              label="Presale"
                              color="success"
                              size="small"
                            />
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            textShadow: "1px 1px 20px black",
                          }}
                          style={
                            coin.hours24 > 0
                              ? { color: "green" }
                              : { color: "red" }
                          }
                          align="center"
                        >
                          {coin.hours24 ? (
                            <div>
                              <span>{coin.hours24 > 0 ? "+" : ""}</span>
                              {coin.hours24}
                              <span>%</span>
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell
                          sx={{ color: "white", fontSize: "0.8rem" }}
                          align="center"
                        >
                          {coin.launchDateKnown
                            ? truncatedDate(coin.launchDate)
                            : "TBA"}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#4caf50",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          {coin.vote}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(coin._id);
                            }}
                          >
                            <RocketLaunchIcon fontSize="small" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </TableContainer>
        {!promoted && coins.length > itemsToShow ? (
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSeeMore}
              style={{ margin: "20px" }}
              size="small"
            >
              See More
            </Button>
          </Container>
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
}

export default CoinTable;
