import { Container } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { adLongData } from "../Constants.js";
import NavigateNextIcon from "@mui/icons-material/NavigateNext.js";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore.js";

function AdBanner() {
  return (
    <div style={{ marginTop: "40px" }}>
      <Container maxWidth="xl">
        <Carousel
          NextIcon={<NavigateNextIcon />}
          PrevIcon={<NavigateBeforeIcon />}
          animation="fade"
          navButtonsAlwaysVisible
          fullHeightHover={false}
          navButtonsProps={{
            style: {
              background: "rgba(0, 0, 0, 0.5)",
              borderRadius: 0,
            },
          }}
        >
          {adLongData.map((item, index) => (
            <div key={index}>
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}

export default AdBanner;
