import React from 'react'
import { Route, Routes } from "react-router"
import MyAccount from '../components/User/profile'
import UserProfile from '../components/User/sidebar'


function User() {
    return (
        <div>
            <Routes>
                <Route
                    path="/profile"
                    element={<MyAccount />}
                />
                {/* <Route
                    path="/address"
                    element={<UserProfileSidebar />}
                    /> */}

            </Routes>
        </div>
    )
}

export default User