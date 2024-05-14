import React, { useEffect, useState } from 'react';
import './activity.css';
import './Activity.scss';

// Import icons
import { BsArrowRightShort } from 'react-icons/bs';
// Import image
import user from '../../../Assets/img.jpg';
import axios from 'axios';

const Activity = () => {
  const [lastOrders, setLastOrders] = useState([]);

  useEffect(() => {
    const fetchLastOrder = async () => {
      try {
        const response = await axios.get('http://localhost:4000/static/getLastCustomerorder');
        setLastOrders(response.data);
      } catch (err) {
        console.error("Error fetching last orders", err);
      }
    };

    fetchLastOrder();
  }, []);

  return (
    <div className='activitySection'>
      <div className="heading flex">
        <h1>Recent Activity</h1>
        <button className='btn flex'>
          See All 
          <BsArrowRightShort className='icon'/>
        </button>
      </div>
      <div className="secContainer grid">
        {lastOrders.map((order, index) => (
          <div className="singleCustomer flex" key={index}>
            {/* Render user image if available */}
            {/* <img src={`http://localhost:4000/Orders/getphoto/${order.user?._id}`} alt="Customer Image" /> */}
            <div className="customerDetails">
              {/* Conditional rendering of user details */}
              {order.user ? (
                <>
                  <span className="name">{order.user.username}</span>
                  <small>Ordered a new  Product</small>
                </>
              ) : (
                <span className="name">Unknown User</span>
              )}
            </div>
            <div className="duration">{order.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activity;
