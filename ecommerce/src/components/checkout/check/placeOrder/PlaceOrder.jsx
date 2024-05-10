import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Stack
        spacing={4}
        sx={{
          padding: "2%",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h1">📦</Typography>
        <Typography variant="h5">Thank you for your order!</Typography>
        <Typography variant="body1" color="text.secondary">
          Your order number is <strong>#140396</strong>. We have emailed your
          order confirmation and will update you once it's shipped.
        </Typography>
        <Button
          variant="contained"
          sx={{
            alignSelf: "start",
            width: { xs: "100%", sm: "auto" },
            backgroundColor: "#1976d2",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#1565c0",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={goHome}
        >
          Go to Home
        </Button>
      </Stack>
    </div>
  );
};

export default PlaceOrder;
