
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules'
import ASDN from "../../../Images/Home/Our collection/ASAD.png"
import WhiteOcean from "../../../Images/Home/Our collection/White Ocean.png"
import Mockup from "../../../Images/Home/Our collection/Bottle Mockup 1.png"
import "../../../styles/Home/OurCollection.css"
function Ourcollection() {
    const [slidesPerView, setSlidesPerView] = useState(6);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 500) {
                setSlidesPerView(1.5);
            }else if (screenWidth <= 900) {
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
    const OurCollectionImages = [
        {
            image: ASDN,
            name: "ASAD"
        },
        {
            image: WhiteOcean,
            name: "White Ocean"
        },
        {
            image: Mockup,
            name: "Bottle Mockup"
        },
        {
            image: ASDN,
            name: "ASAD"
        },
        {
            image: WhiteOcean,
            name: "White Ocean"
        },
        {
            image: Mockup,
            name: "Bottle Mockup"
        },
        {
            image: ASDN,
            name: "ASAD"
        },
        {
            image: WhiteOcean,
            name: "White Ocean"
        },
        {
            image: Mockup,
            name: "Bottle Mockup"
        },
    ]

    return (
        <>
            <div className='Our_collection_main_div' >
                {/* Main Heading */}
                <div className='Main_Home_heading text-center' >OUR COLLECTION</div>

                {/* Swiper */}
                <div>
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
                        {OurCollectionImages.map((image, index) => (
                            <SwiperSlide key={index} className='main_swiper_slide_our_collection' >
                                <div className='main_our_collection_swiper_options' >
                                    <img src={image.image} alt={`ImagesOf ${index + 1}`} className='Our_collection_slider_images' />
                                    <div>{image.name}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Navigation Buttons */}
                    {/* <div className="navigation-buttons">
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                    </div> */}
                </div>
                <div className='view_more_button_div' >
                    <div className='click_buttons view_more_button_home_page' >VIEW MORE </div>
                </div>
            </div>
        </>
    );
}

export default Ourcollection;
