import React from 'react'
import "../../../styles/Home/OurProdutsImages/upperImages.css"
import MainImage from "../../../Images/Home/ourprodutImages/all_packs_images.png"
function NewHomeBottomBanner() {
  return (
    <div className='upper_images_main_div'>
        <img loading="lazy" src={MainImage} alt="Bottom Banner" className='upper_images' />
    </div>
  )
}

export default NewHomeBottomBanner