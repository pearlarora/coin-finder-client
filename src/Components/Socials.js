import React from "react";
import TelegramIcon from "@mui/icons-material/Telegram.js";
import TwitterIcon from "@mui/icons-material/Twitter.js";

function Socials() {
  return (
    <div class="social-btns">
      <a class="btn twitter" href="https://x.com/coinfinder_cc">
        <TwitterIcon className="twitterIcon" />
      </a>
      <a class="btn telegram" href="https://t.me/coinfinderccofficial">
        <TelegramIcon className="telegramIcon" />
      </a>
    </div>
  );
}

export default Socials;
