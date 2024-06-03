import { Container } from "@mui/material";
import React from "react";
import { adSquare } from "../Constants.js";

function AdSquare() {
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
              width: "12.5rem",
              objectFit: "cover",
              marginTop: 41,
            }}
          />
        </a>
      </Container>
    </div>
  );
}

export default AdSquare;
