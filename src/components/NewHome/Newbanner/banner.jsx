

import React, { useState, useEffect } from 'react';
import "../../../styles/NewHome/newbanner.css";
import { makeApi } from '../../../api/callApi.tsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

function BannerCampain() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const banner = await makeApi('/api/get-all-banners', 'GET');
                setImages(banner.data.banner);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

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
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <Link to={`/product/all-products/${image.BannerCategory}`} >
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <LazyLoadImage effect="blur" loading='lazy' src={image.bannerImage} className="caretor_banner_image" alt={`Slide ${index + 1}`} />
                        </div>
                        </Link>
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
