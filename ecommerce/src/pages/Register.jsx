import React, { useState } from "react";
import axios from 'axios';
import {  useNavigate  } from 'react-router-dom'
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
//import { register } from "../redux/apiCalls";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: url(https://img.freepik.com/free-photo/top-view-nuts-concept-with-copy-space_23-2148693979.jpg?w=1380&t=st=1710594258~exp=1710594858~hmac=da0cf0c6cb8929006b5019634fdda0fb18a9342f7927360f5e703cf2fe844cb5);
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const user = { username, email, password, name, lastName };
      console.log(user);
      const response = await axios.post('http://localhost:4000/auth/register', user);
      console.log(response);
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error.response.data);
      // Handle error, maybe set error state to display error message
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Create my account</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
          <Input
            placeholder="last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="confirm password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of m y personal
            data in accordan,ce with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">Create</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
