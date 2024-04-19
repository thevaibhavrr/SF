
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules'
import ASDN from "../../../Images/Home/Our collection/ASAD.png"
import WhiteOcean from "../../../Images/Home/Our collection/White Ocean.png"
import Mockup from "../../../Images/Home/Our collection/Bottle Mockup 1.png"
import "../../../styles/Home/besatSaller.css"

function BesatSaller() {
    
    const OurCollectionImages = [
        {
            image: ASDN,
            name: "ASAD",
            price: 100
        },
        {
            image: WhiteOcean,
            name: "White Ocean",
            price: 100
        },
        {
            image: Mockup,
            name: "Bottle Mockup",
            price: 100
        },
        {
            image: ASDN,
            name: "ASAD",
            price: 100
        },
        {
            image: WhiteOcean,
            name: "White Ocean",
            price: 100
        },
        {
            image: Mockup,
            name: "Bottle Mockup",
            price: 100
        },
        {
            image: ASDN,
            name: "ASAD",
            price: 100
        },
        {
            image: WhiteOcean,
            name: "White Ocean",
            price: 100
        },
        {
            image: Mockup,
            name: "Bottle Mockup",
            price: 100
        },
    ]

  return (
    <>
    <div className='Our_collection_main_div  bestSaller_main' >
        {/* Main Heading */}
        <div className='Main_Home_heading text-center' >BEST SELLERS</div>

        {/* Swiper */}
        <div>
            <Swiper
                slidesPerView={3}
                spaceBetween={100}
                slidesPerGroup={1}
                loop={true}
                loopFillGroupWithBlank={true}
                navigation={true}
                className="mySwiper main_Best_Saller_swiper"
                modules={[Navigation]}
            >
                {OurCollectionImages.map((image, index) => (
                    <SwiperSlide key={index} className='main_swiper_slide_our_collection' >
                        <div className='main_our_collection_swiper_options' >
                            <img src={image.image} alt={`ImageNumber ${index + 1}`} className='Our_collection_slider_images' />
                            <div className='bestSaller_details' >
                            <div>{image.name}</div>
                            <div>₹{image.price}</div>
                            <div className='Add_to_cart_button' >Add to Cart</div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Navigation Buttons */}
            <div className="navigation-buttons">
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        </div>
<div className='view_more_button_div' >
        <div className='click_buttons view_more_button_home_page' >VIEW MORE </div>
</div>
    </div>
</>
  )
}

export default BesatSaller