import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];

export default function Review() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const card = useSelector((state) => state.cart.products);
  const item = useSelector((state) => state.cart);

  React.useEffect(() => {
    setProducts(card);
  }, [card]);

  React.useEffect(() => {
    setItems(item);
  }, [item]);

  const placeOrder = () => {
    navigate("/placeOrder");
  };

  return (
    <Box
      sx={{
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
        <Typography variant="h4" sx={{ color: "#333", fontWeight: 700 }}>
          Review Your Order
        </Typography>
        <List disablePadding>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary="Products"
              secondary={`${products.length} selected`}
            />
            <Typography variant="body2">${items.total}</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Shipping" />
            <Typography variant="body2">$9.99</Typography>
          </ListItem>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary="Total"
              secondary={`$${parseFloat(items.total) + 9.99}`}
            />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {`$${parseFloat(items.total) + 9.99}`}
            </Typography>
          </ListItem>
        </List>
        <Divider sx={{ borderColor: "#ddd" }} />
        <Stack
          direction="column"
          divider={<Divider flexItem sx={{ borderColor: "#ddd" }} />}
          spacing={4}
          sx={{ mt: 4 }}
        >
          <div>
            <Typography variant="h6" sx={{ color: "#333", fontWeight: 700 }}>
              Shipment Details
            </Typography>
            <Typography variant="body1">John Smith</Typography>
            <Typography variant="body2" color="text.secondary">
              {addresses.join(", ")}
            </Typography>
          </div>
          <div>
            <Typography variant="h6" sx={{ color: "#333", fontWeight: 700 }}>
              Payment Details
            </Typography>
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item key={product.name} xs={12} sm={6}>
                  <Stack direction="row" spacing={1} useFlexGap>
                    <Typography variant="body1" sx={{ color: "#333" }}>
                      {product.title}
                    </Typography>
                    <Typography variant="body2">${product.price}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </div>
        </Stack>
        <Button
          sx={{
            width: "fit-content",
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: "#1976d2",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#1565c0",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </Stack>
    </Box>
  );
}
