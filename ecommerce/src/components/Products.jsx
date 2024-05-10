import styled from "styled-components";
import Product from "../components/Product";
import axios from "axios";
import { useEffect, useState } from "react";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, sort }) => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios
      .get(`http://localhost:4000/Products/getproductsbycategory/${cat}`)
      .then((res) => {
        setProducts(res.data.products); 
      })
      .catch((err) => {
        console.log(err);
        });
  }, [cat]);
  
  return (
    <Container>
      <h1>ghjk</h1>{products.map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
