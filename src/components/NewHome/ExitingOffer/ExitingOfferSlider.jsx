import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import "../../../styles/NewHome/ExitingOfferSlider.css";
import BannerImage from "../../../Images/Home/banner/home_banner.png";
import BannerSecondImage from "../../../Images/Home/banner/banner_2.png";
import BannerThirdImage from "../../../Images/Home/banner/banner_3.png";
import { Link } from 'react-router-dom';

function Banner() {
  const Banner = [
    { id: 1, image: BannerImage },
    { id: 2, image: BannerSecondImage },
    { id: 3, image: BannerThirdImage },
    { id: 4, image: BannerImage },
    { id: 6, image: BannerThirdImage },
    { id: 5, image: BannerSecondImage },
  ];
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [slidesPerView, setSlidesPerView] = useState(1.3);


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
    <div className="main_banner_div top_slider">
      {/* <Swiper
        spaceBetween={100}
        slidesPerView={1.4}
        initialSlide={2.5}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {Banner.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.image}
              alt={`banner-${item.id}`}
              className="home_page_banner_image New_Home_banner"
              style={{borderRadius:"50px"}}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
      <div className="main-slider-section-start pt-3">
        <div className="main-slider-div">
          <div className="our-product-slider-start">
            <Swiper
              onSwiper={setSwiperRef}
              onSlideChange={handleSlideChange}
              slidesPerView={slidesPerView}
              initialSlide={2}
              centeredSlides={true}
              spaceBetween={20}
              pagination={{
                type: 'fraction',
              }}
              className="mySwiper"
            >
              {Banner.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className='main_our_collection_swiper_options_New_Home '>
                      <img
                        loading="lazy"
                        src={image.image}
                        alt={`ImagesOf ${index + 1}`}
                        className='w-100'
                      />
                      <div className='text-black' style={{ textWrap: 'nowrap' }}>
                        {image.name}
                      </div>
                    </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="prev-next-buttons">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-caret-left-fill prev-button"
                viewBox="0 0 16 16"
                onClick={handlePrevClick}
              >
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-caret-right-fill next-button"
                viewBox="0 0 16 16"
                onClick={handleNextClick}
              >
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
