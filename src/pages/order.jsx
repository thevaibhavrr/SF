import React from 'react'
import { Route, Routes } from "react-router"
import ProductSidebar from '../components/products/slidebar/sidebar'
import Allproduct from '../components/products/allproduct'
import MainCart from '../components/order/cart/mainCart'


function Order() {
    return (
        <div>
            <Routes>
                <Route
                    path="/my-cart"
                    element={<MainCart />}
                />
            
            </Routes>
        </div>
    )
}

export default Order