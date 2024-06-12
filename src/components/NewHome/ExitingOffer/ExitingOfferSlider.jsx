import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../styles/NewHome/ExitingOfferSlider.css";
import BannerImage from "../../../Images/Home/banner/home_banner.png";
import BannerSecondImage from "../../../Images/Home/banner/banner_2.png";
import BannerThirdImage from "../../../Images/Home/banner/banner_3.png";

function Banner() {
  const Banner = [
    { id: 1, image: BannerImage },
    { id: 2, image: BannerSecondImage },
    { id: 3, image: BannerThirdImage },
    { id: 4, image: BannerImage },
    { id: 6, image: BannerThirdImage },
    { id: 5, image: BannerSecondImage },
  ];

  return (
    <div className="main_banner_div top_slider">
      <Swiper
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
      </Swiper>
    </div>
  );
}

export default Banner;
