import React from "react";
import TelegramIcon from "@mui/icons-material/Telegram.js";
import TwitterIcon from "@mui/icons-material/Twitter.js";

function Socials() {
  return (
    <div class="social-btns">
      <a class="btn twitter" href="#">
        <TwitterIcon fontSize="large" className="twitterIcon" />
      </a>
      <a class="btn telegram" href="https://t.me/coinfinderccofficial">
        <TelegramIcon fontSize="large" className="telegramIcon" />
      </a>
    </div>
  );
}

export default Socials;
