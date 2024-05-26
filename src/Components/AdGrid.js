import React from "react";
import { Container, ImageList, ImageListItem, Link } from "@mui/material";
import { advertisementData, pinkShade } from "../Constants.js";

function AdGrid() {
  return (
    <div style={{ margin: "5px 0 10px 0" }}>
      <Container maxWidth="xl">
        <ImageList cols={2} gap={20} sx={{ marginBottom: "10px" }}>
          {advertisementData.map((item, itemIndex) => (
            <ImageListItem
              key={itemIndex}
              style={{ border: "2px solid #4252cb" }}
            >
              <img src={item.img} alt={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
        <Link href="#" underline="none" color={pinkShade}>
          Want your ad here? Click to Chat!
        </Link>
      </Container>
    </div>
  );
}

export default AdGrid;
