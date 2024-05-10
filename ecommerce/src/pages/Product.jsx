import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
object-fit: cover;
height: 370px; 
width: 500px;
  ${mobile({ height: "30vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 5px;
`;
const Title = styled.h1`
  font-weight: 300;
  font-size: 40px;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const OrderQuantity = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
  height: 50px;
`;
const Quantity = styled.span`
  flex: 1;
  text-align: center;
  font-size: 20px;
  border-radius: 10px;
  margin-right: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 1s ease;
  background-color: ${(props) => (props.clicked ? "lightgray" : "white")};
  border: ${(props) => (props.clicked ? "1px solid black" : "none")};

  &:hover {
    border: 1px solid black;
  }
`;
const AddQuantity = styled.div`
  display: flex;
  font-size: 20px;
`;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.div`
  font-weight: 500;
  padding: 10px;
  font-size: 20px;
  height: 50px;
  width: 150px;
  margin: 20px 5px;
  background-color: #ffffff;
  border: 2px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #f8f4f4;
  }
`;
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [productName, setProductName] = useState(null);
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState(null);
  const [weight, setWeight] = useState('');
  const [stock, setStock] = useState(1);
  const [userID, setUserID] = useState("");


  const dispatch = useDispatch();
  {/*useEffect(() => {
    const storedUserID = localStorage.getItem('user_data');
    if (storedUserID) {
      setUserID(storedUserID);
    }
  }, []);
*/}
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest.get(`http://localhost:4000/Products/getoneproduct/${id}` );
        const productData = response.data.result;
        setProductName(productData.productName);
        setDesc(productData.desc);
        setPrice(productData.price); 
        setWeight(productData.weight)   
        //    console.log(product.img);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

 /* const handleClick = (index) => {
    setClickedIndex(index);
  };*/
  const handleQuantity = (type) => {
    if (type === "dec" && stock > 0) {
      setStock(stock - 1);
    } else if (type === "inc") {
      setStock(stock + 1);
    } else if (type === "dec" && stock === 1) {
      // Set quantity to 0 directly if it's already 0
      setStock(1);
    }
  };
  const handleOrder = async () => {
    try {
      let user_id = localStorage.getItem('user_data');
  
      if (!user_id) {
        user_id = {};
      } else {
        // Parse user_id as JSON
        user_id = JSON.parse(user_id);
      }
  
      console.log(user_id);
  
      const response = await axios.post('http://localhost:4000/Cart/addtocart', {
        userID: user_id,
        productId: id,
        quantity: stock,
      });
  
      dispatch(addProduct(response.data));
  
      console.log(response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      console.error('Error adding product to cart:', error);
      console.error('Server error:', error.response.data);
    }
  };
  
  
   
  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          {productName && <Image src={`http://localhost:4000/Products/productPhoto/${id}`} alt="dali" />}
        </ImgContainer>
        <InfoContainer>
        <Title>{productName}</Title>
          <Desc>{desc} </Desc>
          <Price>{price} TND</Price>
          <OrderQuantity>
              <Quantity >
                {weight}
              </Quantity>
          </OrderQuantity>

          <AddContainer>
            <AmountContainer>
              <AddQuantity>
                <RemoveIcon onClick={() => handleQuantity("dec")} />
                <Amount>{stock}</Amount>
                <AddIcon onClick={() => handleQuantity("inc")} />
              </AddQuantity>
            </AmountContainer>
            <Button onClick={() => handleOrder("dec")}>Add To Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
