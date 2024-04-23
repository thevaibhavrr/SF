import React from 'react'
import BannerImage from "../../Images/Home/banner/home_banner.png"
import "../../styles/Home/banner.css"
function AboutBanner() {
  const data = [
    {
      message: "Hello World! 03:48:53  sec ",
      time: 1713867533,
    },
    {
      message: "Hello World! 2 03:49:53 ",
      time: 1713867593,
    },
    {
      message: "Hello World! 3 03:50:53 ",
      time: 1713867653,
    },
  ];
  
  function scheduleMessages() {
    data.forEach(({ message, time }) => {
      const delay = time * 1000 - Date.now();
      if (delay > 0) {
        setTimeout(() => {
          console.log(message);
        }, delay);
      }
    });
  }
  
  scheduleMessages();
  return (
    <>
    <div className='Home_page_banner_main_div' >
        <img src={BannerImage} alt="Banner" className='home_page_banner_image' />
    </div>


    </>
  )
}

export default AboutBanner