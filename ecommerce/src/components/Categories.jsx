import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  const [categoriesFromApi, setCategoriesFromApi] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Products/getcategory");
        console.log(response.data);
        const categoriesData = response.data.category; // Accessing 'category' property
        setCategoriesFromApi(categoriesData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <Container>
        {categoriesFromApi.length > 0 ? (
          categoriesFromApi.map((category, index) => (
            <CategoryItem item={{ id: index, title: category, cat: category }} key={index} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </div>
  );
};

export default Categories;
