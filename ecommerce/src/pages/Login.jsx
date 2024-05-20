import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {  useNavigate  } from 'react-router-dom'
import axios from 'axios';
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url(https://img.freepik.com/free-photo/top-view-delicious-nuts-concept_23-2148694022.jpg?w=1380&t=st=1710594471~exp=1710595071~hmac=30b07afc9557727abf44ce8c1d1ce299247433c5bfac472cf4c3c8a1ef221ba5);
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;
const StyledLink = styled.a`
  margin: 5px 0px;
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Error = styled.span`
  color: red;
`;
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:4000/auth/login', {
        username: username,
        password: password
      });
      
      //const { user, accessToken } = response.data;
      console.log(response);
      //save data user in localstorage 
      toast.success('Successfully logged in!!');


      localStorage.setItem('user_data', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.accessToken)

  //dispatch(login(response.data));
      navigate('/');

    } catch (error) {
      console.error('Error during login:', error);
      toast.error('check again');

      // Handle error, maybe set error state to display error message
    }
  };


  return (
    <Container>
     <Toaster/>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong</Error>}
          <StyledLink to="/forgot-password">Forgot password?</StyledLink>
          <StyledLink to="/register">Create a new account</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
