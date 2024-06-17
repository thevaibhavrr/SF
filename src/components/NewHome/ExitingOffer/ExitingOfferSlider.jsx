import React, {  useState } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import "../../../styles/NewHome/ExitingOfferSlider.css";

import Oil from "../../../assets/img/NewHome/Oil -Banner.svg"
import Rice from "../../../assets/img/NewHome/Rice - Banner.svg"
import Spices from "../../../assets/img/NewHome/Spices- Banner.svg"
function Banner() {
  const Banner = [
    { id: 1, image: Oil },
    { id: 2, image: Rice },
    { id: 3, image: Spices },
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
    <div className="">
    <div className=" pt-3">
        <div className="main-slider-div-for-banner">
          <div className="">
            <Swiper
              onSwiper={setSwiperRef}
              onSlideChange={handleSlideChange}
              slidesPerView={slidesPerView}
              initialSlide={2}
              centeredSlides={true}
              spaceBetween={20}
              loop={true}
              pagination={{
                type: 'fraction',
              }}
              className="mySwiper"
            >
              {Banner.map((image, index) => (
                <SwiperSlide key={index}>
                    <div className=' '>
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
