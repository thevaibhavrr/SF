import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules'
import "../../../styles/NewHome/SpicesLineUp.css"
import { Link } from 'react-router-dom';
import { makeApi } from '../../../api/callApi.tsx';
import Primaryloader from '../../loaders/primaryloader.jsx';
import ProductSlider from '../utils/proudctSlider.jsx';

function SpicesProduct() {
    const [slidesPerView, setSlidesPerView] = useState(5.3);
    const [products, setProducts] = useState([]);
    const [AllProductLoader, setAllProductLoader] = useState(false);
    const [productType, setProductType] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userLocation = localStorage.getItem("country")
        if (token) {
            setProductType(userLocation)
        }
    }, [localStorage.getItem("token")])

    // get data
    const fetchProduct = async () => {
        try {
            setAllProductLoader(true);
            const response = await makeApi(`/api/get-all-products?&perPage=10&category=665d6b3e4133e96dad0359e6&productType=${productType}&IsOutOfStock=false`, "GET");
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setAllProductLoader(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 500) {
                setSlidesPerView(1.5);
            } else if (screenWidth <= 900) {
                setSlidesPerView(3);
            } else if (screenWidth <= 1039) {
                setSlidesPerView(4);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    useEffect(() => {
        fetchProduct();
    }, [productType])

    const [swiperRef, setSwiperRef] = useState(null);
    const [activeIndex, setActiveIndex] = useState(2);

    const handleSlideChange = () => {
        if (swiperRef) {
            setActiveIndex(swiperRef.activeIndex);
        }
    };
    const handlePrevClick = () => {
        if (swiperRef) {
            swiperRef.slidePrev();
        }
    };

    const handleNextClick = () => {
        if (swiperRef) {
            swiperRef.slideNext();
        }
    };

    return (
        <>
            <div className='Our_collection_main_div' >
                {/* Main Heading */}

                {/* Swiper */}
                <div className="swiper-container-wrapper">
                    {AllProductLoader ? (
                        <div className="All_Product_loader">
                            <div className='' >
                                <Primaryloader />
                            </div>
                        </div>
                    ) : (
                    <ProductSlider
                        products={products}
                        slidesPerView={slidesPerView}
                        initialSlide={2}
                    />
                   
                    )}
                </div>
                <div className='view_more_button_div' >
                    <Link to={"/product/all-products"} className='css-for-link-tag' >
                        <div className='click_buttons view_more_button_home_page' >VIEW All </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SpicesProduct;
