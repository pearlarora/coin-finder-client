import { Container, useMediaQuery } from "@mui/material";
import React from "react";
import { adSquare, pinkShade } from "../Constants.js";
import { Link } from "react-router-dom";

function AdSquare() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <div>
      <Container>
        <a
          href="https://www.icodrops.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={adSquare}
            alt="Square Ad"
            style={{
              width: "12rem",
              objectFit: "cover",
              marginTop: 42,
            }}
          />
        </a>
        <Link
          href="https://t.me/coinfinderccofficial"
          underline="none"
          color={pinkShade}
          fontSize={isMobile ? "12px" : "16px"}
        >
          Want your ad here? Click to Chat!
        </Link>
      </Container>
    </div>
  );
}

export default AdSquare;
