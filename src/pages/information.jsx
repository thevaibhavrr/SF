import React , { Suspense , lazy } from 'react'
import { Route, Routes } from "react-router"
import Primaryloader from '../components/loaders/primaryloader'
// import BillingAddress from '../components/Information/billingAdress'
// import ShippingAddress from '../components/Information/shippingAddress'
 
const BillingAddress = lazy(() => import('../components/Information/billingAdress'))
const ShippingAddress = lazy(() => import('../components/Information/shippingAddress'))



function Information() {
    return (
        <div>
            <Suspense fallback={<div> <Primaryloader /> </div>}>
            <Routes>
                <Route
                    path="/billing-address"
                    element={<BillingAddress />}
                />
                <Route path="/shipping-address" element={<ShippingAddress />} />

            </Routes>
            </Suspense>
        </div>
    )
}

export default Information