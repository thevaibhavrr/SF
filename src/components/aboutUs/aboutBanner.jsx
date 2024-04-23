import React from 'react'
import BannerImage from "../../Images/Home/banner/home_banner.png"
import "../../styles/Home/banner.css"
function AboutBanner() {
//   const data = [
//     {
//       message: "Hello World! 04:11:53  sec ",
//       time: 1713868913,
//     },
//     {
//       message: "Hello World! 2 04:12:53 ",
//       time: 1713868973,
//     },
//     {
//       message: "Hello World! 3 04:13:53 ",
//       time: 1713869033,
//     },
//   ];
  
//   function scheduleMessages() {
//     data.forEach(({ message, time }) => {
//       const delay = time * 1000 - Date.now();
//       if (delay > 0) {
//         setTimeout(() => {
//           console.log(message);
//         }, delay);
//       }
//     });
//   }
  
//   scheduleMessages();
  return (
    <>
    <div className='Home_page_banner_main_div' >
        <img src={BannerImage} alt="Banner" className='home_page_banner_image' />
    </div>


    </>
  )
}

export default AboutBanner