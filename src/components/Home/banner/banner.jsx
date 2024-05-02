// import React from 'react'
// import BannerImage from "../../../Images/Home/banner/home_banner.png"
// import "../../../styles/Home/banner.css"
// function HomeBanner() {
//   return (
//     <>
//     <div className='Home_page_banner_main_div' >
//         <img src={BannerImage} alt="Banner" className='home_page_banner_image' />
//     </div>
 

//     </>
//   )
// }

// export default HomeBanner

import React from "react";
import { Carousel } from "react-bootstrap";
// import "../../styles/Home/Banner.css";
import "../../../styles/Home/banner.css"
import BannerImage from "../../../Images/Home/banner/home_banner.png"
import BannerSecondImage from "../../../Images/Home/banner/banner_2.png"
import BannerThirdImage from "../../../Images/Home/banner/banner_3.png"



function Banner() {

  const Banner = [
    {
      id: 1,
      image: BannerImage
    },
    {
      id: 2,
      image: BannerSecondImage
    },
    {
      id: 3,
      image: BannerThirdImage
    },
   
  ]

  return (
    <div className="main_banner_div">
      <Carousel fade interval={3000}  >
        {
          Banner.map((item) => (
            <Carousel.Item>
              <img
                key={item.id}
                src={item.image}
                alt="banner"
                className="home_page_banner_image"
                // initial={{ opacity: 0, scale: 0.5 , rotate: 0 }}
                // animate={{ opacity: 1, scale: 1  , rotate: 20 }}
                // transition={{ duration: 2.6 , repeatType: "reverse", repeat: Infinity}} 
              />
            </Carousel.Item>
          ))
        }

      </Carousel>
    </div>
  );
}

export default Banner;
