
import React, { useState, useEffect } from 'react';
import Banner01 from "../../../Images/Home/banner/Banner01.png"
import Banner02 from "../../../Images/Home/banner/Banner02.svg"
import Banner03 from "../../../Images/Home/banner/Banner03.svg"
import Banner04 from "../../../Images/Home/banner/Banner04.svg"
import Banner05 from "../../../Images/Home/banner/Banner05.svg"
// import "../../../styles/Home/banner.css"
import "../../../styles/NewHome/newbanner.css"


const images = [Banner01, Banner02, Banner03, Banner04, Banner05];

function BannerCampain() {
    const [activeIndex, setActiveIndex] = useState(0);

  

    return (
        <div className='main_creator_banner'>
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-indicators slider_number_desing_bottom">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={index}
                            className={index === activeIndex ? "active" : ""}
                            aria-current={index === activeIndex ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                            <img src={image} className="caretor_banner_image" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default BannerCampain;
