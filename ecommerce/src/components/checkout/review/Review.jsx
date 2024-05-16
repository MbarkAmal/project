import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];

export default function Review() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart detail when the component mounts
    fetchCartDetail();
  }, []);

  const fetchCartDetail = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_data'));
      if (userData && userData._id) {
        const storedUserId = userData._id;
        const response = await axios.get(`http://localhost:4000/Cart/getcart/${storedUserId}`);
        setCart(response.data);
      } else {
        console.error('User data or user ID not found in local storage');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const placeOrder = () => {
    navigate("/placeOrder");
  };

  const calculateSubtotal = (cart) => {
    console.log('Cart:', cart); 
    let subtotal = 0;
    cart?.forEach(cartItem => {
        subtotal += cartItem.total;
      });
    return subtotal;
  
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff",
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
  {cart && Array.isArray(cart) && cart.map((cartItem) => (
    <List key={cartItem._id} disablePadding>
      {cartItem.products.map((product) => (
        <ListItem key={product._id} sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={product.productName}
            secondary={`Quantity: ${cartItem.quantity}`}
          />
          <Typography variant="body2">{product.price} dt</Typography>
        </ListItem>
      ))}
      {/* Add shipping details if available */}
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Shipping" />
        <Typography variant="body2">$9.99</Typography>
      </ListItem>
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText
          primary="Total"
          secondary={`${parseFloat(cartItem.total) } dt`}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {`$${parseFloat(cartItem.total)}`}
        </Typography>
      </ListItem>
    </List>
  ))}
  <Divider sx={{ borderColor: "#ddd" }} />
  <Stack
    direction="column"
    divider={<Divider flexItem sx={{ borderColor: "#ddd" }} />}
    spacing={4}
    sx={{ mt: 4 }}
  >
    <div>
      <Typography variant="h6" sx={{ color: "#333", fontWeight: 700 }}>
      Total amount 
      </Typography>
        {calculateSubtotal(cart)} dt    
      <Grid container spacing={2}>
        {cart && cart.map((cartItem) => (
          cartItem.products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6}>
              <Stack direction="row" spacing={1} useFlexGap>
                <Typography variant="body1" sx={{ color: "#333" }}>
                </Typography>
              </Stack>
            </Grid>
          ))
        ))}
      </Grid>
    </div>
  </Stack>
</Stack>

    </Box>
  );
}

