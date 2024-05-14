import React, { useState , useEffect } from "react";
import axios from "axios";
import "./adminprofile.scss";
import { addUser, updateUser } from "../../redux/userSlice";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../Components/SideBar Section/Sidebar";
import img from "../../../src/Assets/img.jpg";

const AdminProfile = () => {
  
  const [username , setUsername] = useState('')
  const [email , setEmail] = useState('')
  const [role , setRole] = useState('')
  const [photo_user, setPhoto_user] = useState(null);
  const [saveimg, setSaveimg] = useState(false);
  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate();
 // const userDataString = localStorage.getItem("user_data");
  //const userData = JSON.parse(userDataString);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto_user(file);
      setSaveimg(true);
    }
  };

  const handleSave = () => {
    console.log("Photo saved:", photo_user);
    setSaveimg(false);
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("user_data");
    const userData = JSON.parse(userDataString);
    if (userData) {
      setUsername(userData.username);
      setEmail(userData.email);
      setRole(userData.role);
      setPhoto_user(userData.photo_user);
      setUserData(userData); // Set userData state variable

    }
  }, []);

  const handleUpdate = async () => {
    try {
      const updateAdminData = {
        username: username,
        email: email,
        role: role,
        photo_user : photo_user,
      };

      const userDataString = localStorage.getItem("user_data");
      const userData = JSON.parse(userDataString);

      const response = await axios.put(
        `http://localhost:4000/user/updateUser/${userData._id}`,
        updateAdminData
      );
      console.log("Updated admin:", response.data);
      
      if (response.status === 200) {
        dispatch(updateUser(response.data.user));
        handleLogout();
        //navigate('/');
      } else {
        console.error("Failed to update user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
    navigate('/login') 
 };

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    handleUpdate(); 
  }; 



  return (
    <div className="container">
      <Sidebar />

      <div className="mainContent">
        <div className="bottom flex">
          <div className="imgcontainer">
            {photo_user ? (
              <img src={URL.createObjectURL(photo_user)} className="orderimg" alt="Uploaded" />
            ) : (
              
              <img src={`http://localhost:4000/admin/adminPhoto/${userData._id}`} className="orderimg" alt="Default" />
            )}
          </div>
          <div className="admin_detail">
            <h2>{username} </h2>
            <p>{email} - Administrator</p>
            <div className="edit_photo">
              <label htmlFor="file-upload" className="file-upload">
                photo Upload
              </label>
              <input id="file-upload" type="file" onChange={handleFileChange} />
              {saveimg && <button onClick={handleSave}>Save</button>}
            </div>
          </div>
          
        </div>
        <div>
          <div className="detail_accunt">
            <h2>Account Details</h2>
         
            <form className="formSection" onSubmit={handleFormSubmit}>
            <div className="row">
            <div className="col-25">
              <label htmlFor="productName">Username</label>
            </div>
            <div className="col-75">
           <input type="text"
              value={username}
            onChange={(e) => setUsername(e.target.value)}      />

            </div>
           </div>

           <div className="row">
            <div className="col-25">
              <label htmlFor="productName">Email</label>
            </div>
            <div className="col-75">
             <input type="text" value={email} 
             onChange={(e) => setEmail(e.target.value)}  />
            </div>
           </div>
           <div className="row">
              <div className="col-25">
                <label htmlFor="">Role</label>
              </div>
              <div className="col-75">
              
                  <select name="role" value={role}            
                    onChange={(e) => setRole(e.target.value)} >
 
                    <option value="role">Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                
              </div>
            </div>

           <div className="update_btn">
            <button className="btnUP" type="submit"  >
              Update Profile
            </button>
          </div>

            </form>
          </div>
          </div>
      </div>
    </div>
  );
};
export default AdminProfile;
