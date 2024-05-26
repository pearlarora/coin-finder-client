// import React, { useEffect, useState } from "react";
// import CoinTable from "../Components/Table.js";
// import { coins } from "../Constants.js";
// import { Container } from "@mui/material";
// import AdGrid from "../Components/AdGrid.js";
// import AdBanner from "../Components/AdBanner.js";
// // import Footer from "../Components/Footer";
// // import axios from "axios";
// // import { CoinList } from "../Config/api";

// function LandingPage() {
//   const [loading, setLoading] = useState(false);

//   // const [coinList, setCoinList] = useState([]);
//   // const fetchCoinList = async () => {
//   //   setLoading(true);
//   //   const { data } = await axios.get(CoinList);
//   //   setCoinList(data);
//   //   setLoading(false);
//   // };
//   // useEffect(() => fetchCoinList(), []);

//   return (
//     <div>
//       <Container
//         maxWidth="xl"
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           gap: "20px",
//         }}
//       >
//         <AdBanner />
//         <AdGrid />
//         <CoinTable heading="Promoted Coins" coins={coins} loading={false} />
//         <AdGrid />
//         <CoinTable heading="Coins" coins={coins} loading={loading} />
//       </Container>
//     </div>
//   );
// }

// export default LandingPage;

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
        // console.log("Promoted coins: ", promotedRes.data);
        console.log("All coins: ", coinsRes.data);
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
        <AdBanner />
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
