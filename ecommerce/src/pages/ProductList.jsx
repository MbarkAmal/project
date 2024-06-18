import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1`
  padding: 10px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ display: "flex", justifyContent: "flex-end" })}
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "75%", display: "flex", justifyContent: "flex-end" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;
const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname
    .split("/")[2] ; 
    /*.split("_")
    .map(
      w =>
        w[0].toUpperCase() +
        w.slice(1).toLowerCase()
    ).join(" ");*/
  const [filter, setFilter] = useState();
  const [sort, setsort] = useState();
  //const [cat , setCat] = useState();

  const handlefilter = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.value]: value,
    });
    console.log(filter);
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>sort products  </FilterText>
          <Select onChange={(e) => setsort(e.target.value)}>
            <Option value="Newest">Newest</Option>
            <Option value="asc">price (asc)</Option>
            <Option value="desc">price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
