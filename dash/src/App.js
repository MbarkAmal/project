import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Product from '../src/Pages/products page/Product';
import User from '../src/Pages/users page/User';
import UpdateUser from '../src/Pages/users page/UpdateUser';
import Home from "./Home";
import AddProduct from "./Pages/add Product/AddProduct";
import Update from "./Pages/update Product/Update";
import Order from "./Pages/orders page/Orders";
import OrderChart from './static/OrderChart';
import DeliveryRapport from './static/DeliveryRapport';
import ProductsChart from './static/ProductsChart';
import DeliveredProducts from './static/DeliveredProducts';
import AdminProfile from './Pages/admin page/AdminProfile';
import Login from "./Pages/login/Login";
import TotalPrice from './static/TotalPrice';

const App = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userDataString = localStorage.getItem("user_data");
        const userData = JSON.parse(userDataString);
        setUserData(userData);
    }, []);

    return (
        <Router>
            <Routes>
                {userData ? (
                    <>
                        <Route path="/" element={<Login />} />
                        <Route path="/dash" element={<Home />} />
                        <Route path="/AdminProfile" element={<AdminProfile />} />
                        <Route path="/Product" element={<Product />} />
                        <Route path="/Product/AddProduct" element={<AddProduct />} />
                        <Route path="/Product/UpdateProduct/:id" element={<Update />} />
                        <Route path="/User" element={<User />} />
                        <Route path="/UpdateUser/:id" element={<UpdateUser />} />
                        <Route path="/Order" element={<Order />} />
                        <Route path="/OrderChart" element={<OrderChart />} />
                        <Route path="/DeliveryRapport" element={<DeliveryRapport />} />
                        <Route path="/TotalPrice" element={<TotalPrice />} />
                        <Route path="/ProductsChart" element={<ProductsChart />} />
                        <Route path="/DeliveredProducts" element={<DeliveredProducts />} />
                    </>
                ) : (
                    <Route path="/login" element={<Login />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;
