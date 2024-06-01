import logo from "./Assets/logo.png";
import ad1 from "./Assets/ad1.png";
import ad2 from "./Assets/ad2.png";
import adlong1 from "./Assets/adlong1.png";
import adlong2 from "./Assets/adlong2.png";
import adsq from "./Assets/adsq.png";
import bitcoin from "./Assets/coinIcons/bitcoin.svg.png";

export const base_url = "https://coin-finder.onrender.com/";
// export const base_url = "https://localhost:3200/";
export const website_name = "CoinFinder";
export const pagination = 10;
export const primary = "#4252cb";
export const secondary = "#080808";
export const tertiary = "#2f323f";
export const lighter = "#393c4c";
export const translucent = "#121318";
export const darker = "#c4c2c2";
export const greyish = "#e0e0e0";
export const pinkShade = "#FF66C3";

export const advertisementData = [
  { img: ad1, title: "Advertisement1" },
  { img: ad2, title: "Advertisement2" },
];
export const adLongData = [
  { img: adlong1, title: "Advertisement1" },
  { img: adlong2, title: "Advertisement2" },
];
export const adSquare = adsq;
export const websiteLogo = logo;

export const coinTableHeader = [
  "Coin",
  "Chain",
  "Market Cap",
  "24h%",
  "Launch",
  "Votes",
  "Vote",
];
function createCoinData(
  _id,
  icon,
  symbol,
  name,
  chain,
  market_cap,
  percentage,
  launch,
  votes
) {
  return {
    _id,
    icon,
    symbol,
    name,
    chain,
    market_cap,
    percentage,
    launch,
    votes,
  };
}
export const coins = [
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Bitcoin",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "ETH",
    "Etherium",
    "Chain",
    200,
    -25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Name",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Name",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Name",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Name",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Name",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Name",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Name",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Name",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Name",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
  createCoinData(
    1,
    bitcoin,
    "BTC",
    "Name",
    "Chain",
    200,
    25,
    "4 days ago",
    400
  ),
];
