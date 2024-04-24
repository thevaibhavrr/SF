import React from 'react'
import { Route, Routes } from "react-router"
import MyAccount from '../components/User/profile'
import UserProfile from '../components/User/sidebar'
import MyOrders from '../components/User/Myorder'
import Mywhislist from '../components/User/mywhislist'
import Myaddress from '../components/User/myaddress'


function User() {
    return (
        <div>
            <Routes>
                <Route
                    path="/profile"
                    element={<MyAccount />}
                />
                <Route
                    path="/userprofile"
                    element={<MyAccount />}
                    />
                    <Route 
                    path='/my-orders'
                    element={<MyOrders/>}
                    />
                    <Route
                    path='/my-wishlist'
                    element={<Mywhislist />}
                    />
                    <Route
                    path='/my-address'
                    element={<Myaddress />}
                    />

            </Routes>
        </div>
    )
}

export default User