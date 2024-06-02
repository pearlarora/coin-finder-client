import { Container } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { adLongData, adSquare } from "../Constants.js";
import NavigateNextIcon from "@mui/icons-material/NavigateNext.js";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore.js";

function AdSquare() {
  return (
    <div>
      <Container>
        <img
          src={adSquare}
          alt="Square Ad"
          style={{
            width: "13.5rem",
            objectFit: "cover",
            marginTop: 60,
          }}
        />
      </Container>
    </div>
  );
}

export default AdSquare;
