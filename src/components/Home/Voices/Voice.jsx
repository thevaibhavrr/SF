// import React from 'react'
// import "../../../styles/Home/Voice.css"
// function Voice() {
//   return (
//     <div>Voice</div>
//   )
// }

// export default Voice

// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';

// // import './styles.css';
// import "../../../styles/Home/Voice.css"


// // import required modules
// import { Navigation } from 'swiper/modules';

// export default function Voice() {
//   return (
//     <>
//       <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
//         <SwiperSlide>Slide 1</SwiperSlide>
//         <SwiperSlide>Slide 2</SwiperSlide>
//         <SwiperSlide>Slide 3</SwiperSlide>
//         <SwiperSlide>Slide 4</SwiperSlide>
//         <SwiperSlide>Slide 5</SwiperSlide>
//         <SwiperSlide>Slide 6</SwiperSlide>
//         <SwiperSlide>Slide 7</SwiperSlide>
//         <SwiperSlide>Slide 8</SwiperSlide>
//         <SwiperSlide>Slide 9</SwiperSlide>
//       </Swiper>
//     </>
//   );
// }

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import "../../../styles/Home/Voice.css"

import User from "../../../Images/Home/Voice/ReviewUser.png"

function Voices() {

    const OurCollectionImages = [
        {
            image: User,
            Heading: "Spice Heaven!",
            message: "SK Foods spices are a game-changer! My dishes went from bland to brilliant with just a sprinkle of their magic. Thank you, SK Foods, for turning my kitchen into a flavor paradise!",
            name: "Vaibhav",
        },
        {
            image: User,
            Heading: "Spice Heaven!",
            message: "SK Foods spices are a game-changer! My dishes went from bland to brilliant with just a sprinkle of their magic. Thank you, SK Foods, for turning my kitchen into a flavor paradise!",
            name: "Vaibhav",
        }, {
            image: User,
            Heading: "Spice Heaven!",
            message: "SK Foods spices are a game-changer! My dishes went from bland to brilliant with just a sprinkle of their magic. Thank you, SK Foods, for turning my kitchen into a flavor paradise!",
            name: "Pinku",
        },
    ]

    return (
        <>
            <div className='main_Voice_parent_div' >
                {/* Main Heading */}
                <div className='Main_Home_heading text-center' >Voices of Approval</div>

                {/* Swiper */}
                <div>
                    <Swiper
                        slidesPerView={2.7}
                        spaceBetween={100}
                        slidesPerGroup={1}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        className="mySwiper voices_Swiper_main_div "
                    >
                        {OurCollectionImages.map((image, index) => (
                            <SwiperSlide key={index} className='Voice_slider_option_SwiperSlide' >

                                <div className='Voice_slider_Image_div' >
                                    <img src={image.image} alt={`ImageNumber ${index + 1}`} className='Voice_slider_images' />
                                </div>
                                <div className='Voice_slider_details_div ' >
                                    <div className='Voice_slider_Heading' >{image.Heading}</div>
                                    <div className='Voice_slider_stars'>★★★★★</div>
                                    <div className='Voice_slider_Message' >{image.message}</div>
                                    <div className='Voice_slider_Name' >{image.name}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>

            </div>
        </>
    )
}

export default Voices