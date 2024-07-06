import React, {  useState } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import "../../../styles/NewHome/ExitingOfferSlider.css";

import Oil from "../../../assets/img/NewHome/Oil -Banner.svg"
import Rice from "../../../assets/img/NewHome/Rice - Banner.svg"
import Spices from "../../../assets/img/NewHome/Spices- Banner.svg"
import { useEffect } from 'react';
import { makeApi } from '../../../api/callApi.tsx';
function Banner() {
  const [Banner, setImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const banner = await makeApi('/api/get-all-existing-banners', 'GET');
                setImages(banner.data.banner);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
  const Banners = [
    { id: 1, bannerImage: Oil },
    { id: 2, bannerImage: Rice },
    { id: 3, bannerImage: Spices },
    { id: 1, bannerImage: Oil },
    { id: 2, bannerImage: Rice },
    { id: 3, bannerImage: Spices },
    { id: 1, bannerImage: Oil },
    { id: 2, bannerImage: Rice },
    { id: 3, bannerImage: Spices },
    { id: 1, bannerImage: Oil },
    { id: 2, bannerImage: Rice },
    { id: 3, bannerImage: Spices },
  ];  
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [slidesPerView, setSlidesPerView] = useState(1.7);


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
              initialSlide={1}
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
                        src={image.bannerImage}
                        alt={`ImagesOf ${index + 1}`}
                        className='w-100'
                        style={{maxHeight:"500px"}}
                      />
                      {/* <div className='text-black' style={{ textWrap: 'nowrap' }}>
                        {image.BannerFor}
                      </div> */}
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
