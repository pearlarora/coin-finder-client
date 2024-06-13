import { Container, useMediaQuery } from "@mui/material";
import React from "react";
import { adSquare, primary } from "../Constants.js";

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
        <br />
        <p style={{ fontSize: "12px", color: primary }}>
          Advertisement: ICODrops
        </p>
      </Container>
    </div>
  );
}

export default AdSquare;
