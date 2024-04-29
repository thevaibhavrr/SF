// UserProfileForMobile.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/User/mainMobilepageuserPofile.css"
import { makeApi } from '../../api/callApi.tsx';
import Primaryloader from "../loaders/primaryloader.jsx"

const UserProfileForMobile = () => {
  const [userDatails, setUserDetails] = useState()
  const [AllProductLoader, setAllProductLoader] = useState(false);

  const fetchUserDetail = async () => {
    try {
      setAllProductLoader(true);

      const responce = await makeApi("/api/my-profile", "GET")
      setUserDetails(responce.data.user)
    } catch (error) {
      console.log(error)
    } finally {
      setAllProductLoader(false);
    }
  }
  useEffect(() => {
    fetchUserDetail()
  },[])
  return (
    <>

      <div className='top_parent_div_all_product' >
        {AllProductLoader ? <div className="All_Product_loader">
          <div className='' >
            <Primaryloader />
          </div>
        </div> :
          <div className="UserProfileForMobile_container">
            <div className="top-bar">
              <div className="user-info">
                <img src={userDatails?.userImage} alt="User Avatar" className="avatar" />
                <span className="username">Hi, {userDatails?.firstName}</span>
              </div>
            </div>
            <div className="menu">
              <ul>
                <li><Link to="/user/userprofile">My Profile</Link></li>
                <li><Link to="/user/my-address">Saved Address</Link></li>
                <li><Link to="/user/my-wishlist">My Wishlist</Link></li>
                <li><Link to="/user/my-orders">My Orders</Link></li>
              </ul>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default UserProfileForMobile;
