import React from 'react'
import BannerImage from "../../Images/Home/banner/home_banner.png"
import "../../styles/Home/banner.css"
function AboutBanner() {
  const data = [
    {
      message: "Hello World! 10:55:16  sec ",
      time: 1713936316,
    },
    {
      message: "Hello World! 2  10:55:50 ",
      time: 1713936350,
    },
    {
      message: "Hello World! 3 10:56:15 ",
      time: 1713936375,
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