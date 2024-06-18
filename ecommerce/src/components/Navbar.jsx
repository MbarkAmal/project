import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { red } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "0px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Languages = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  ${mobile({ display: "none" })}
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "22px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-style: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  console.log(quantity);

 { /*const [connectuser , setConnectuser] =useState({});
  const getuser = () =>{
    setConnectuser (JSON.parse(localStorage.getItem("user_data")))
  }*/
}
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("user_data");
  localStorage.removeItem("token");
  navigate('/login');
  window.location.reload();

};

const isLoggedIn = !!localStorage.getItem("user_data"); 


  useEffect(() =>{
   // getuser();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Languages>En</Languages>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <span style={{
                textWrap: "nowrap",
                padding: "0 8px"
              }}>
MTB  SHOP             </span>
          </Logo>

        </Center>
        <Right>
          {isLoggedIn ? (
            <Link>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <MenuItem>Register</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>Log In</MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon color="action" />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
