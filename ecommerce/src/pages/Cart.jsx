import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile } from "../responsive";
import ReactDOM from "react-dom";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


// Add your Stripe public key here

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none; /* Remove the border style */

  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;


const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; /* Inherit color from parent */
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductQuantity = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProductAmountContrainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "15px" })}
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  //const cart = useSelector((state) => state.cart);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams(); 
  useEffect(() => {

    fetchCart();
  }, []);

    const fetchCart = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        
        if (userData && userData._id) {
          const storedUserId = userData._id;
          console.log(storedUserId)
  
          const response = await axios.get(`http://localhost:4000/Cart/getcart/${storedUserId}`);
          setCart(response.data); 
          console.log(response.data)
        } else {
          console.error('User data or user ID not found in local storage');
        }
  
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false); 
      }
    };

  
// count total product 
  const calculateSubtotal = (cart) => {
    console.log('Cart:', cart); 
    let subtotal = 0;
    cart?.forEach(cartItem => {
        subtotal += cartItem.total;
      });
    return subtotal;
  
  };
  //  //delete panier from cart 

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/Cart/deletePanier/${id}`)
    .then(res => {
      console.log(res);
     fetchCart();
   })
    .catch(error => {
      console.error("error deleting panier ", error)
    })    
  };
  
  return (
    <Container>
  <Navbar />
  <Announcement />
  <Wrapper>
    <Title>YOUR BAG</Title>
    <Top>
        <TopButton>
          <StyledLink to="/">CONTINUE SHOPPING  </StyledLink>
          </TopButton>
      <TopTexts>
        <TopText>Shopping Bag(2)</TopText> {/* You can replace the '2' with the actual length of the cart */}
        <TopText>Your WishList(0)</TopText>
      </TopTexts>
      <TopButton type="filled">CHECK OUT NOW</TopButton>
    </Top>
    <Bottom>
      <Info>
        {cart && Array.isArray(cart) && cart.map((cartItem) => (
          <React.Fragment key={cartItem._id}>
            {cartItem.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  {/* Assuming img is not provided in the response */}
                   <Image src={`http://localhost:4000/Cart/getphoto/${product._id}`} /> 
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.productName}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductQuantity>
                      <b>Quantity:</b> {cartItem.quantity}  {/* Assuming the quantity is the same for all products in the cart */}
                    </ProductQuantity>
                    <ProductPrice>{product.price} DT</ProductPrice>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContrainer>
                   {/*  <AddIcon /> <ProductAmount>5</ProductAmount> Placeholder values */}
                   <TopButton onClick={() => handleDelete (cartItem._id)}> <RemoveCircleIcon />
                   </TopButton>
                  </ProductAmountContrainer>
                  <ProductPrice>
                    {/* Assuming product.price and cartItem.quantity are numbers */}
                    {cartItem.total} $
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </React.Fragment>
        ))}
      </Info>
      {/* Assuming Summary should be rendered after all cart items */}
      <Summary>
        <SummaryTitle>ORDER NOW</SummaryTitle>
        {/* Assuming you need to calculate the total price for all cart items */}
        <SummaryItem>
          <SummaryItemText>Subtotal</SummaryItemText>
          <SummaryItemPrice>${calculateSubtotal(cart)}</SummaryItemPrice>    
              </SummaryItem>
        <SummaryItem>
          <SummaryItemText>Estimated shipping </SummaryItemText>
          <SummaryItemPrice>$ 5</SummaryItemPrice>
        </SummaryItem>
        <SummaryItem>
          <SummaryItemText>Shipping Discount</SummaryItemText>
          <SummaryItemPrice>$ -5</SummaryItemPrice>
        </SummaryItem>
        <SummaryItem type="total">
          <SummaryItemText>Total</SummaryItemText>
          {/* Assuming you need to calculate the total price for all cart items */}
          <SummaryItemPrice>$ </SummaryItemPrice>
        </SummaryItem>
        <Button>
        <StyledLink to="/checkout">CHECK OUT NOW</StyledLink>
          </Button>
      </Summary>
    </Bottom>
  </Wrapper>
  <Footer />
</Container>

  );

  
};


export default Cart;
