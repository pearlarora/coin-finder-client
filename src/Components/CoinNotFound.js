import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box } from "@mui/material";
import { primary, tertiary } from "../Constants";

const CoinNotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "63vh",
        color: "white",
        textAlign: "center",
        padding: 3,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h2" component="h1" gutterBottom>
          Coin Not Found
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          We're sorry, but the coin you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{
            mt: 4,
            backgroundColor: primary,
            "&:hover": { backgroundColor: tertiary },
          }}
        >
          Go to Home
        </Button>
      </Container>
    </Box>
  );
};

export default CoinNotFound;
