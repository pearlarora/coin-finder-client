// import { Button, Container, Grid, IconButton } from "@mui/material";
// import React from "react";
// import {
//   adSquare,
//   primary,
//   tertiary,
//   translucent,
//   websiteLogo,
// } from "../Constants";
// import CopyText from "./CopyText";
// import LanguageIcon from "@mui/icons-material/Language";
// import TelegramIcon from "@mui/icons-material/Telegram";
// import TwitterIcon from "@mui/icons-material/Twitter";

// function Banner({ coin }) {
//   const truncatedDate = (date) =>
//     date.length > 10 ? `${date.substring(0, 10)}` : date;

//   const importAll = (r) => {
//     let images = {};
//     r.keys().forEach((key) => {
//       images[key] = r(key);
//     });
//     return images;
//   };

//   // const coinIcons = importAll(
//   //   require.context("../Assets/coinIcons", false, /\.(png|jpe?g|svg)$/)
//   // );

//   const networkIcons = importAll(
//     require.context("../Assets/networks", false, /\.(png|jpe?g|svg)$/)
//   );

//   // const logoPath = coinIcons[`./${coin.logo}`];
//   const networkPath = networkIcons[`./${coin.network}.png`];

//   // const fetchLogo = async () => {
//   //   try {
//   //     const logoRef = storage.ref(`logos/${coin.logo}`);
//   //     const logoURL = await logoRef.getDownloadURL();
//   //     return logoURL;
//   //   } catch (error) {
//   //     console.error("Failed to fetch logo:", error);
//   //     return null;
//   //   }
//   // };

//   // const renderLogo = async () => {
//   //   const logoURL = await fetchLogo();
//   //   return (
//   //     <img
//   //       src={logoURL}
//   //       alt="Coin Icon"
//   //       height="184rem"
//   //       width="184rem"
//   //       style={{ borderRadius: "50%" }}
//   //     />
//   //   );
//   // };

//   return (
//     <div>
//       <Container
//         style={{
//           height: "17.5rem",
//           backgroundColor: translucent,
//           borderRadius: 20,
//           marginTop: 60,
//           padding: 50,
//           fontSize: "1.2rem",
//         }}
//       >
//         <Grid container>
//           <Grid item xs={2.5}>
//             {/* {coin.logo ? renderLogo() : null} */}
//             <img
//               src={coin.logo}
//               alt="Coin Icon"
//               height="184rem"
//               width="184rem"
//               style={{ borderRadius: "50%" }}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <div>
//               <span style={{ fontSize: "1.7rem" }}>
//                 <b>{coin.name} |</b>
//               </span>{" "}
//               {coin.symbol}
//             </div>
//             <div
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: "10px",
//                 backgroundColor: tertiary,
//                 padding: 8,
//                 margin: "15px 0",
//                 borderRadius: "20px",
//               }}
//             >
//               <img
//                 src={networkPath}
//                 alt="Network Icon"
//                 style={{ width: 30, height: 30, borderRadius: "50%" }}
//               />
//               <p>{coin.network}:</p>
//               <CopyText text={coin.address} />
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 10,
//                 fontSize: "1rem",
//                 marginTop: 10,
//               }}
//             >
//               <Button
//                 variant="contained"
//                 size="large"
//                 href={
//                   coin.website.startsWith("http")
//                     ? coin.website
//                     : `https://${coin.website}`
//                 }
//                 target="_blank"
//               >
//                 <LanguageIcon />
//               </Button>
//               {/* TODO: Change link */}
//               <Button
//                 variant="contained"
//                 size="large"
//                 href={
//                   coin.website.startsWith("http")
//                     ? coin.telegram
//                     : `https://${coin.telegram}`
//                 }
//                 target="_blank"
//               >
//                 <TelegramIcon />
//               </Button>
//               {/* TODO: Change link */}
//               {coin.twitter ? (
//                 <Button
//                   variant="contained"
//                   size="large"
//                   href={
//                     coin.website.startsWith("http")
//                       ? coin.website
//                       : `https://${coin.website}`
//                   }
//                   target="_blank"
//                 >
//                   <TwitterIcon />
//                 </Button>
//               ) : null}
//             </div>
//           </Grid>
//           <Grid item xs={3.5}>
//             {coin.projectInPresale ? (
//               <div>
//                 <h3 style={{ color: primary, marginBottom: 10 }}>
//                   Project In Presale
//                 </h3>
//                 <p>
//                   {truncatedDate(coin.presaleStartDate)} &nbsp;To &nbsp;
//                   {truncatedDate(coin.presaleEndDate)}
//                 </p>
//               </div>
//             ) : (
//               <></>
//             )}
//             {coin.launchDate ? (
//               <div>
//                 <h3 style={{ color: primary, marginTop: 20, marginBottom: 10 }}>
//                   Launch Date
//                 </h3>
//                 <p>{truncatedDate(coin.launchDate)}</p>
//               </div>
//             ) : (
//               <></>
//             )}
//           </Grid>
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default Banner;

import { Button, Container, Grid } from "@mui/material";
import React from "react";
import { adSquare, primary, tertiary, translucent } from "../Constants";
import CopyText from "./CopyText";
import LanguageIcon from "@mui/icons-material/Language";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";

function Banner({ coin }) {
  const truncatedDate = (date) =>
    date.length > 10 ? `${date.substring(0, 10)}` : date;

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

  const networkPath = networkIcons[`./${coin.network}.png`];

  const formatUrl = (url) => {
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div>
      <Container
        style={{
          backgroundColor: translucent,
          borderRadius: 20,
          marginTop: 40,
          padding: 10,
          fontSize: "1rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={2.5} style={{ textAlign: "center" }}>
            <img
              src={coin.logo}
              alt="Coin Icon"
              height="150rem"
              width="150rem"
              style={{ borderRadius: "50%" }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <div>
              <span style={{ fontSize: "1.3rem" }}>
                <b>{coin.name} |</b>
              </span>{" "}
              {coin.symbol}
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: tertiary,
                padding: 8,
                margin: "10px 0",
                borderRadius: "20px",
              }}
            >
              <img
                src={networkPath}
                alt="Network Icon"
                style={{ width: 20, height: 20, borderRadius: "50%" }}
              />
              <p>{coin.network}:</p>
              <CopyText text={coin.address} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: "0.8rem",
                marginTop: 10,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                size="small"
                href={formatUrl(coin.website)}
                target="_blank"
              >
                <LanguageIcon fontSize="small" />
              </Button>
              <Button
                variant="contained"
                size="small"
                href={formatUrl(coin.telegram)}
                target="_blank"
              >
                <TelegramIcon fontSize="small" />
              </Button>
              {coin.twitter && (
                <Button
                  variant="contained"
                  size="small"
                  href={formatUrl(coin.twitter)}
                  target="_blank"
                >
                  <TwitterIcon fontSize="small" />
                </Button>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={3.5}>
            {coin.projectInPresale && (
              <div>
                <h3 style={{ color: primary, marginBottom: 10 }}>
                  Project In Presale
                </h3>
                <p>
                  {truncatedDate(coin.presaleStartDate)} &nbsp;To &nbsp;
                  {truncatedDate(coin.presaleEndDate)}
                </p>
              </div>
            )}
            {coin.launchDate && (
              <div>
                <h3 style={{ color: primary, marginTop: 20, marginBottom: 10 }}>
                  Launch Date
                </h3>
                <p>{truncatedDate(coin.launchDate)}</p>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Banner;