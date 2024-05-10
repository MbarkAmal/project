import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "35vh" })}
`;
const Info = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
/*  const handleClick = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/Products/getcategory/${item.cat}`); // Assuming your backend endpoint is '/api/products/{category}'
      console.log(response.data.products); // Just an example, you might want to navigate or update state here
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };*/
    return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={"https://nwwildfoods.com/cdn/shop/products/raw-organic-almonds.jpg?v=1674424072&width=3000"} />
        <Info>
          <Title>{item.title}</Title>
          <Button >SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
