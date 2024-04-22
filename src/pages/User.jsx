import React from 'react'
import { Route, Routes } from "react-router"
import MyAccount from '../components/User/profile'


function User() {
    return (
        <div>
            <Routes>
                <Route
                    path="/profile"
                    element={<MyAccount />}
                />

            </Routes>
        </div>
    )
}

export default User