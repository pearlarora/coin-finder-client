import { Container, Typography, AppBar } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  darker,
  greyish,
  secondary,
  tertiary,
  website_name,
} from "../Constants.js";
import { websiteLogo } from "../Constants.js";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        boxShadow: "10px 0 80px #232531",
        backgroundColor: "transparent",
        marginTop: "5vh",
        paddingBottom: "1px",
      }}
    >
      <Container maxWidth="xl">
        <Container
          maxWidth="xl"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "140px",
          }}
        >
          <Typography
            onClick={() => navigate("/")}
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem",
              cursor: "pointer",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={websiteLogo}
              alt={website_name}
              style={{ height: "40px" }}
            />
            {website_name}
          </Typography>
          <Typography
            style={{
              fontSize: "1rem",
              color: darker,
            }}
          >
            Terms & Conditions &nbsp; &nbsp; Privacy Policy
          </Typography>
        </Container>
        <Container
        // maxWidth="xl"
        // style={{
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   color: greyish,
        // }}
        >
          <Typography
            style={{
              fontSize: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0  0 80px -40px",
              color: darker,
            }}
          >
            <CopyrightIcon />
            &nbsp;2024 CoinSniper.XYZ | All Rights Reserved
          </Typography>
        </Container>
      </Container>
    </div>
  );
};

export default Footer;
