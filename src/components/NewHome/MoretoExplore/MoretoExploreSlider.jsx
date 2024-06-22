import React, { useEffect, useState } from 'react';
import '../../../styles/NewHome/SpicesLineUp.css';
import { Link } from 'react-router-dom';
import { makeApi } from '../../../api/callApi.tsx';
import Primaryloader from '../../loaders/primaryloader.jsx';
import ProductSlider from '../utils/proudctSlider.jsx';

function MoretoExportSlider() {
    const [slidesPerView, setSlidesPerView] = useState(5);
    const [products, setProducts] = useState([]);
    const [allProductLoader, setAllProductLoader] = useState(false);
    const [productType, setProductType] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userLocation = localStorage.getItem('country');
        if (token) {
            setProductType(userLocation);
        }
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setAllProductLoader(true);
                const response = await makeApi(`/api/get-all-products?perPage=10&productType=${productType}&IsOutOfStock=false`, 'GET');
                setProducts(response.data.products);
            } catch (error) {
                console.log(error);
            } finally {
                setAllProductLoader(false);
            }
        };

        if (productType) {
            fetchProduct();
        }
    }, [productType]);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 500) {
                setSlidesPerView(1);
            } else if (screenWidth <= 900) {
                setSlidesPerView(3);
            } else if (screenWidth <= 1039) {
                setSlidesPerView(4);
            } else {
                setSlidesPerView(5);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <div className='Our_collection_main_div'>
            <div className="swiper-container-wrapper">
                {allProductLoader ? (
                    <div className="All_Product_loader">
                        <Primaryloader />
                    </div>
                ) : (
                    <ProductSlider
                    products={products}
                    slidesPerView={slidesPerView}
                    initialSlide={2}
                />
                )}
            </div>
            <div className='view_more_button_div'>
                <Link to={"/product/all-products"} className='css-for-link-tag'>
                    <div className='click_buttons view_more_button_home_page'>VIEW All</div>
                </Link>
            </div>
        </div>
    );
}

export default MoretoExportSlider;
