import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules'
import "../../../styles/NewHome/SpicesLineUp.css"
import { Link } from 'react-router-dom';
import { makeApi } from '../../../api/callApi.tsx';
import Primaryloader from '../../loaders/primaryloader.jsx';

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
                        // <Swiper
                        //     slidesPerView={slidesPerView}
                        //     spaceBetween={20}
                        //     slidesPerGroup={1}
                        //     defaultValue={2}
                        //     loop={true}
                        //     loopFillGroupWithBlank={true}
                        //     navigation={true}
                        //     className="mySwiper main_our_collection_swiper"
                        //     modules={[Navigation]}
                        // >
                        //     {products.map((image, index) => (
                        //         <SwiperSlide key={index} className='main_swiper_slide_our_collection' >
                        //             <Link to={`/product/product-details/${image._id}`} className='css-for-link-tag' >
                        //                 <div className='main_our_collection_swiper_options_New_Home orangeLinerGradient' >
                        //                     <img load="lazy" src={image.thumbnail} alt={`ImagesOf ${index + 1}`} className='Our_collection_slider_images' />
                        //                     <div className='text-black' >{image.name}</div>
                        //                 </div>
                        //             </Link>
                        //         </SwiperSlide>
                        //     ))}
                        // </Swiper>
                        <div className="main-slider-section-start pt-3">
                        <div className="main-slider-div">


                            <div className="our-product-slider-start ">
                                <Swiper
                                    onSwiper={setSwiperRef}
                                    onSlideChange={handleSlideChange}
                                    slidesPerView={5}
                                    initialSlide={2}
                                    centeredSlides={true}
                                    spaceBetween={20}
                                    pagination={{
                                        type: "fraction",
                                    }}
                                    className="mySwiper"
                                >
                                    {products.map((image, index) => (
                                        <SwiperSlide key={index}>

                                            <div className='main_our_collection_swiper_options_New_Home orangeLinerGradient' >
                                                <img load="lazy" src={image.thumbnail} alt={`ImagesOf ${index + 1}`} className='Our_collection_slider_images' />
                                                <div className='text-black ' style={{ textWrap: "nowrap" }} >{image.name}</div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                {/* left */}
                                <div className="prev-next-buttons">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            class="bi bi-caret-left-fill"
                                            viewBox="0 0 16 16"
                                            onClick={handlePrevClick}
                                            className="prev-button"
                                        >
                                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                                        </svg>
                                    </div>

                                    {/* right */}
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            class="bi bi-caret-right-fill"
                                            viewBox="0 0 16 16"
                                            onClick={handleNextClick}
                                            className="next-button"
                                        >
                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
