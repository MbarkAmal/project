import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Switch,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Review from "./components/checkout/review/Review";
import PlaceOrder from "./components/checkout/check/placeOrder/PlaceOrder";
import Payment from "./components/checkout/payment/Payment";
import MainCheckOut from "./pages/MainCheckOut";
function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:category" element={<ProductList />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<MainCheckOut />} />
      <Route path="/checkout/paymentdetails" element={<Payment />} />
      <Route path="/checkout/revieworder" element={<Review />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export default App;
