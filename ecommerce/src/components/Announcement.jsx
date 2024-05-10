import styled from "styled-components";
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 18px;
`;

const Announcement = () => {
  return <Container>super deal free shipping on orders</Container>;
};

export default Announcement;
