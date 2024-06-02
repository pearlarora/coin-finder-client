// import Table from "@mui/joy/Table";
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
// import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch.js";
import axios from "axios";
// import coinIcons from "../Assets/coinIcons/";
// import icon from "../Assets/coinIcons/2024-05-18T18:31:32.262Zyt.png";
// import RocketLaunchTwoToneIcon from "@mui/icons-material/RocketLaunchTwoTone";
// import { KeyboardArrowLeft } from "@mui/icons-material";
// import { CoinList } from "../Config/api";
// import axios from "axios";

function CoinTable({ heading, coins, setCoins, loading }) {
  const navigate = useNavigate();
  // console.log("here coins", coins);
  const promoted = heading === "Promoted Coins";
  const [itemsToShow, setItemsToShow] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const truncatedDate = (date) =>
    date.length > 10 ? `${date.substring(0, 10)}` : date;
  function isCurrentDateInRange(startDate, endDate) {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    return currentDate >= start && currentDate <= end;
  }

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

  // const coinIcons = importAll(
  //   require.context("../Assets/coinIcons", false, /\.(png|jpe?g|svg)$/)
  // );

  const networkIcons = importAll(
    require.context("../Assets/networks", false, /\.(png|jpe?g|svg)$/)
  );

  // const fetchLogo = async (logo) => {
  //   try {
  //     const logoRef = storage.ref(`logos/${logo}`);
  //     const logoURL = await logoRef.getDownloadURL();
  //     return logoURL;
  //   } catch (error) {
  //     console.error("Failed to fetch logo:", error);
  //     return null;
  //   }
  // };

  // // Display the logo image
  // const renderLogo = async (logo) => {
  //   const logoURL = await fetchLogo(logo);
  //   return (
  //     <img
  //       src={logoURL}
  //       alt="Coin Icon"
  //       height={50}
  //       width={50}
  //       style={{ borderRadius: "50%" }}
  //     />
  //   );
  // };

  const handleSeeMore = () => {
    setItemsToShow(itemsToShow + pagination);
  };

  const handleVote = async (coinId) => {
    try {
      await axios.post(`${base_url}coins/${coinId}/vote`);
      const updatedCoins = coins.map((coin) => {
        if (coin._id === coinId) {
          // Increment the vote count
          return { ...coin, vote: coin.vote + 1 };
        }
        return coin;
      });
      setCoins(updatedCoins);
    } catch (error) {
      console.error("Failed to toggle vote:", error);
    }
  };

  const handleRowClick = (coinId) => {
    navigate(`/coin/${coinId}`);
  };

  return (
    <div>
      {/* <img
        // src={`${coinIcons}/bitcoin.svg.png`}
        src={coinIcons["./2024-05-18T18:31:32.262Zyt.png"]}
        // src={`../Assets/coinIcons/2024-05-18T18:31:32.262Zyt.png`}
        alt="alt text"
      /> */}
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
              href="/"
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
                          borderRight: "1px solid #000",
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
                    // const logoPath = `../Assets/coinIcons/${coin.logo}`;
                    // console.log("Coin: " + coin.network);
                    // const logoPath = coinIcons[`./${coin.logo}`];
                    const networkPath = networkIcons[`./${coin.network}.png`];
                    // console.log("Network Path:", networkPath); // Debugging line to check path
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
                        {/* {console.log(pagination)}
                    {console.log(coin)} */}

                        <TableCell
                          sx={{
                            color: "white",
                            padding: "0 0 0 3vw",
                            fontSize: "1rem",
                            position: "sticky",
                            left: 0,
                            zIndex: 1,
                            backgroundColor: tertiary,
                            borderRight: "1px solid #000",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                              // justifyContent: "center",
                            }}
                          >
                            <img
                              src={coin.logo}
                              alt="Coin Icon"
                              height={30}
                              width={30}
                              style={{ borderRadius: "50%" }}
                            />
                            {/* {coin.logo && renderLogo(coin.logo)} */}

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
                            isCurrentDateInRange(
                              coin.presaleStartDate,
                              coin.presaleEndDate
                            ) ? (
                            <Chip label="Chip Filled" />
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
                            <></>
                          )}
                        </TableCell>
                        <TableCell
                          sx={{ color: "white", fontSize: "0.8rem" }}
                          align="center"
                        >
                          {coin.launchDateKnown
                            ? truncatedDate(coin.launchDate)
                            : "-"}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "white",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                          }}
                          align="center"
                        >
                          {coin.vote}
                        </TableCell>
                        <TableCell align="center">
                          {/* <Button
                        variant="contained"
                        size="small"
                        // sx={{ backgroundColor: secondary }}
                      > */}
                          {/* <RocketLaunchIcon /> */}
                          {/* <RocketLaunchTwoToneIcon /> */}
                          {/* &nbsp;{coin.votes} */}
                          {/* </Button> */}
                          <Button
                            variant="contained"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVote(coin._id);
                            }} // Modified the Button component
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
