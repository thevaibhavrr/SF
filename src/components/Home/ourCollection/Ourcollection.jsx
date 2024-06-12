
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules'
import "../../../styles/Home/OurCollection.css"
import { Link } from 'react-router-dom';
import { makeApi } from '../../../api/callApi.tsx';
import Primaryloader from '../../loaders/primaryloader.jsx';
function Ourcollection() {
    const [slidesPerView, setSlidesPerView] = useState(5);
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
            const response = await makeApi(`/api/get-all-products?&perPage=10&productType=${productType}&IsOutOfStock=false`, "GET");
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
    }, [])

    return (
        <>
            <div className='Our_collection_main_div' >
                {/* Main Heading */}
                <div className='Main_Home_heading text-center' >OUR COLLECTION</div>

                {/* Swiper */}
                <div>
                    {AllProductLoader ? <div className="All_Product_loader">
                        <div className='' >
                            <Primaryloader />
                        </div>
                    </div> :
                        <Swiper
                            slidesPerView={slidesPerView}
                            spaceBetween={20}
                            slidesPerGroup={1}
                            defaultValue={2}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            navigation={true}
                            className="mySwiper main_our_collection_swiper"
                            modules={[Navigation]}
                        >
                            {products.map((image, index) => (
                                <SwiperSlide key={index} className='main_swiper_slide_our_collection' >
                                    <Link to={`/product/product-details/${image._id}`} className='css-for-link-tag' >
                                        <div className='main_our_collection_swiper_options' >
                                            <img load="lazy" src={image.thumbnail} alt={`ImagesOf ${index + 1}`} className='Our_collection_slider_images' />
                                            <div className='text-black' >{image.name}</div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    }
                </div>
                <div className='view_more_button_div' >
                    <Link to={"/product/all-products"} className='css-for-link-tag' >

                        <div className='click_buttons view_more_button_home_page' >VIEW MORE </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Ourcollection;
