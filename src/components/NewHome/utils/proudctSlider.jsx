

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Primaryloader from '../../loaders/primaryloader';
import HorizotalLoader from '../../loaders/horizotalLoader';
import LoginPopup from '../../Auth/LoginPopup';
import AddIcon from "../../../Images/order/add_icon_green.png";
import RemoveIcon from "../../../Images/order/remove_icon_red.png";
import { makeApi } from '../../../api/callApi.tsx';
import ProductLloader from '../../loaders/productLoader.jsx';
import { addToCart, removeFromCart } from '../../../utils/productFunction';

const ProductSlider = ({ products, slidesPerView, initialSlide }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide || 2);
  const [productss, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartLoader, setAddToCartLoader] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [productType, setProductType] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userLocation = localStorage.getItem("country");
    if (token) {
      setIsLogin(true);
      setProductType(userLocation);
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await makeApi(`/api/get-all-products?&perPage=10&productType=${productType}&IsOutOfStock=false`, "GET");
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productType]);

  const fetchCart = async () => {
    try {
      const response = await makeApi("/api/my-cart", "GET");
      setCartItems(response.data.orderItems.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {

    fetchCart();
  }, []);

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

  const isInCart = (productId) => {
    return cartItems.some(item => item.productId === productId);
  };

  const getProductQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = async (productId, quantity, availableQuantity) => {
    if (quantity < availableQuantity) {
      await addToCart(productId, setIsLogin, setShowPopup, fetchCart, setCartItems, setAddToCartLoader);
    } else {
      toast("Cannot add more than available quantity.", { type: "error" });
    }
  };

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart(productId, setAddToCartLoader, setCartItems, fetchCart);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='swiper-container-wrapper' style={{ position: "relative" }}>
      {showPopup && <LoginPopup onClose={closePopup} />}
      {isLoading ? (
        <div className="All_Product_loader w-100 d-flex justify-content-center py-4">
          <Primaryloader />
        </div>
      ) : (
        <div className="main-slider-section-start pt-3">
          <div className="main-slider-div">
            <div className="our-product-slider-start">
              <Swiper
                onSwiper={setSwiperRef}
                onSlideChange={handleSlideChange}
                slidesPerView={slidesPerView}
                initialSlide={initialSlide}
                centeredSlides={true}
                spaceBetween={20}
                loop={true}
                pagination={{ type: "fraction" }}
                className="mySwiper"
                modules={[Navigation]}
              >
                {products.map((product, index) => (
                  <SwiperSlide key={index}>
                    <div className='main_our_collection_swiper_options_New_Home orangeLinerGradient'>

                      <LazyLoadImage
                        src={product.thumbnail}
                        alt={`ImagesOf ${index + 1}`}
                        effect="blur"
                        className='Our_collection_slider_images'
                      />
                      <div className='text-black product_name_from_slider' style={{ textWrap: 'nowrap' }}>
                        {product.name}
                      </div>
                      <div className='d-flex justify-content-between w-75 pt-3'>
                        <div className='text-black new-price'>₹{product.price}</div>
                        <div className=''>
                          {isInCart(product._id) ? (
                            <div className='Add_to_cart_and_watchlist_child'>
                              {addToCartLoader[product._id] ? (
                                <div className=''><HorizotalLoader /></div>
                              ) : (
                                <div className="cart-quantity d-flex gap-2 align-items-center">
                                  <LazyLoadImage effect="blur"
                                    loading="lazy"
                                    src={RemoveIcon}
                                    alt="RemoveIcon"
                                    className='Icon_add_to_cart'
                                    onClick={() => handleRemoveFromCart(product._id)}
                                    style={{ cursor: "pointer" }}
                                  />
                                  <span>{getProductQuantity(product._id)}</span>
                                  <LazyLoadImage effect="blur"
                                    loading="lazy"
                                    src={AddIcon}
                                    alt="AddIcon"
                                    className='Icon_add_to_cart'
                                    onClick={() => handleAddToCart(product._id, getProductQuantity(product._id), product?.quantity)}
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div>
                              {addToCartLoader[product._id] ? (
                                <div><HorizotalLoader /></div>
                              ) : (
                                <div className="ADD_button_new_home_page text-black" onClick={() => handleAddToCart(product._id, getProductQuantity(product._id), product?.quantity)} style={{ cursor: "pointer" }}>ADD</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="prev-next-buttons">
                <div onClick={handlePrevClick} className="prev-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-caret-left-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                  </svg>
                </div>
                <div onClick={handleNextClick} className="next-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-caret-right-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.86 7.247l5.482-4.796c.646-.566 1.658-.106 1.658.753v9.592a1 1 0 0 1-1.659.753L3.86 8.753a1 1 0 0 1 0-1.506z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSlider;
