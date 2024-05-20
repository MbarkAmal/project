import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/admin/logindash', {
                username: username,
                password: password
            });

            console.log(response);
            toast.success('Successfully logged in!!');


            // Save data user in localStorage 
            localStorage.setItem('user_data', JSON.stringify(response.data.user))
             localStorage.setItem('token', response.data.accessToken)

            // Dispatch login action
            // dispatch(login(response.data));

            navigate('/dash');
            window.location.reload(); // Refresh the page

        } catch (error) {
            console.error('Error during login:', error);
            toast.error('check again');

            // Handle error, maybe set error state to display error message
        }
    };

    return (
        
        <div className="container">
            

        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }} >
              
              <Toaster/>
            <input
                style={{ padding: 10, marginBottom: 20 }}
                type="text"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                style={{ padding: 10, marginBottom: 20 }}
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleClick} style={{ padding: 10, width: 100 ,   cursor: 'pointer'}}>
                Login
            </button>
        </div>
        </div>
    );
};

export default Login;
