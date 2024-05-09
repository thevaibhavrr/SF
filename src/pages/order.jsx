import React, { Suspense, lazy } from 'react'
import { Route, Routes } from "react-router"
// import ProductSidebar from '../components/products/slidebar/sidebar'
// import Allproduct from '../components/products/allproduct'
// import MainCart from '../components/order/cart/mainCart'
// import Checkout from '../components/order/checkout/checkout'
import Ecombar from '../components/Header/ecombar'
import Primaryloader from '../components/loaders/primaryloader'

const MainCart = lazy(() => import('../components/order/cart/mainCart'))
const Checkout = lazy(() => import('../components/order/checkout/checkout'))


function Order() {
    return (
        <div>
            <Suspense fallback={<div> <Primaryloader /> </div>}>
            <Routes>
                <Route
                    path="/my-cart"
                    element={<MainCart />}
                />
                <Route
                    path="/checkout"
                    element={<Checkout />}
                />
            
            </Routes>
            </Suspense>
            <Ecombar/>
        </div>
    )
}

export default Order