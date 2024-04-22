import React from 'react'
import { Route, Routes } from "react-router"
import ProductSidebar from '../components/products/slidebar/sidebar'
import Allproduct from '../components/products/allproduct'


function Product() {
    return (
        <div>
            <Routes>
                <Route
                    path="/sidebar"
                    element={<ProductSidebar />}
                />
               
                <Route
                    path="/all-products"
                    element={<ProductSidebar />}
                />

            </Routes>
        </div>
    )
}

export default Product