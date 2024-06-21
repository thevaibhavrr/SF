import React, { Suspense, lazy } from 'react';
import { Route, Routes } from "react-router";
import Ecombar from '../components/Header/ecombar';
import Primaryloader from '../components/loaders/primaryloader';
import Scroll from '../components/scroll/smoothscroll';

// Lazy load components
const ProductSidebar = lazy(() => import('../components/products/slidebar/sidebar'));
const ProductDetails = lazy(() => import('../components/products/productDetails'));
// import ProductSidebar from '../components/products/slidebar/sidebar';
// import ProductDetails from '../components/products/productDetails';

function Product() {
    return (
        <div>
            {/* <Scroll /> */}

            <Suspense fallback={<div> <Primaryloader /> </div>}>

                <Routes>
                    {/* <Route
                        path="/sidebar"
                        element={<ProductSidebar />}
                    /> */}
                    <Route
                        path="/all-products"
                        element={<ProductSidebar />}
                    />
                    {/* product details */}
                    <Route
                        path="/product-details/:productId"
                        element={<ProductDetails />}
                    />
                </Routes>
                    <Ecombar />
            </Suspense>

        </div>
    );
}

export default Product;
