import React, { Suspense, lazy } from 'react';
import { Route, Routes } from "react-router";
import Ecombar from '../components/Header/ecombar';
import Primaryloader from '../components/loaders/primaryloader';

// Lazy load components
const ProductSidebar = lazy(() => import('../components/products/slidebar/sidebar'));
const ProductDetails = lazy(() => import('../components/products/productDetails'));

function Product() {
    return (
        <div>

            <Suspense fallback={<div> <Primaryloader /> </div>}>

                <Routes>
                  
                    <Route
                        path="/all-products"
                        element={<ProductSidebar />}
                    />
                    <Route 
                        path="/all-products/:categoryId"
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
