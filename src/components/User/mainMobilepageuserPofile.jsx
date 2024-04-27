// UserProfileForMobile.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/User/mainMobilepageuserPofile.css"
import { makeApi } from '../../api/callApi.tsx';
const UserProfileForMobile = () => {
	const [userDatails, setUserDetails] = useState()

  const fetchUserDetail = async () => {
		try {
			const responce = await makeApi("/api/my-profile", "GET")
			setUserDetails(responce.data.user)
		} catch (error) {
			console.log(error)
		}
	}
  useEffect(() => {
    fetchUserDetail()
  })
  return (
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
  );
}

export default UserProfileForMobile;
