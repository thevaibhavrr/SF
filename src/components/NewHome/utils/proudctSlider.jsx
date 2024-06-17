// // src/components/ProductSlider.jsx
// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import "swiper/css";
// import "swiper/css/navigation";
// import { Link } from 'react-router-dom';
// import Primaryloader from '../../loaders/primaryloader';
// // import '../styles/ProductSlider.css';

// const ProductSlider = ({ products, slidesPerView, initialSlide }) => {
//   const [swiperRef, setSwiperRef] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(initialSlide || 2);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSlideChange = () => {
//     if (swiperRef) {
//       setActiveIndex(swiperRef.activeIndex);
//     }
//   };

//   const handlePrevClick = () => {
//     if (swiperRef) {
//       swiperRef.slidePrev();
//     }
//   };

//   const handleNextClick = () => {
//     if (swiperRef) {
//       swiperRef.slideNext();
//     }
//   };
  

//   return (
//     <div className='swiper-container-wrapper'>
//       {isLoading ? (
//         <div className="All_Product_loader">
//           <Primaryloader />
//         </div>
//       ) : (
//         <div className="main-slider-section-start pt-3">
//           <div className="main-slider-div">
//             <div className="our-product-slider-start">
//               <Swiper
//                 onSwiper={setSwiperRef}
//                 onSlideChange={handleSlideChange}
//                 slidesPerView={slidesPerView}
//                 initialSlide={initialSlide}
//                 centeredSlides={true}
//                 spaceBetween={20}
//                 pagination={{ type: "fraction" }}
//                 className="mySwiper"
//               >
//                 {products.map((product, index) => (
//                   <SwiperSlide key={index}>
//                     <Link to={`/product/product-details/${product?._id}`} className='css-for-link-tag'>
//                       <div className='main_our_collection_swiper_options_New_Home orangeLinerGradient'>
//                         <img
//                           loading="lazy"
//                           src={product?.thumbnail}
//                           alt={`ImagesOf ${index + 1}`}
//                           className='Our_collection_slider_images'
//                         />
//                         <div className='text-black product_name_from_slider ' style={{ textWrap: 'nowrap' }}>
//                           {product.name}
//                         </div>
//                         <div className='d-flex justify-content-between w-75 pt-3' >
//                             <div className='text-black new-price' > ₹{product?.price} </div>
//                             <div className='ADD_button_new_home_page text-black' > ADD </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//               <div className="prev-next-buttons">
//                 <div onClick={handlePrevClick} className="prev-button">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     fill="currentColor"
//                     className="bi bi-caret-left-fill"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
//                   </svg>
//                 </div>
//                 <div onClick={handleNextClick} className="next-button">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="20"
//                     height="20"
//                     fill="currentColor"
//                     className="bi bi-caret-right-fill"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductSlider;

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import Primaryloader from '../../loaders/primaryloader';
import HorizotalLoader from '../../loaders/horizotalLoader';
import LoginPopup from '../../Auth/LoginPopup';
import AddIcon from "../../../Images/order/add_icon_green.png";
import RemoveIcon from "../../../Images/order/remove_icon_red.png";
import { makeApi } from '../../../api/callApi.tsx';

const ProductSlider = ({ slidesPerView, initialSlide }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide || 2);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
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
  }, [localStorage.getItem("token")]);

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

  useEffect(() => {
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

  const addToCart = async (productId) => {
    if (!isLogin) {
      setShowPopup(true);
    } else {
      try {
        setAddToCartLoader(true);
        await makeApi("/api/add-to-cart", "POST", { productId, quantity: 1, shippingPrice: 0 });
        setCartItems(prevState => {
          const existingItem = prevState.find(item => item.productId === productId);
          if (existingItem) {
            return prevState.map(item => {
              if (item.productId === productId) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
          } else {
            return [...prevState, { productId, quantity: 1 }];
          }
        });
      } catch (error) {
        console.error(error.response.data);
      } finally {
        setAddToCartLoader(false);
      }
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setAddToCartLoader(true);
      await makeApi("/api/remove-from-cart", "POST", { productId });
      setCartItems(prevState => prevState.filter(item => item.productId !== productId));
    } catch (error) {
      console.error(error);
    } finally {
      setAddToCartLoader(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='swiper-container-wrapper' style={{position: "relative"}} >
      {showPopup && <LoginPopup onClose={closePopup} />}
      {isLoading ? (
        <div className="All_Product_loader">
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
                pagination={{ type: "fraction" }}
                className="mySwiper"
                modules={[Navigation]}
              >
                {products.map((product, index) => (
                  <SwiperSlide key={index}>
                    {/* <Link to={`/product/product-details/${product._id}`} className='css-for-link-tag'> */}
                      <div className='main_our_collection_swiper_options_New_Home orangeLinerGradient'>
                        <img
                          loading="lazy"
                          src={product.thumbnail}
                          alt={`ImagesOf ${index + 1}`}
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
                                {addToCartLoader ? (
                                  <div><HorizotalLoader /></div>
                                ) : (
                                  <div className="cart-quantity">
                                    <img
                                      loading="lazy"
                                      src={RemoveIcon}
                                      alt="RemoveIcon"
                                      className='Icon_add_to_cart'
                                      onClick={() => removeFromCart(product._id)}
                                    />
                                    <span>{getProductQuantity(product._id)}</span>
                                    <img
                                      loading="lazy"
                                      src={AddIcon}
                                      alt="AddIcon"
                                      className='Icon_add_to_cart'
                                      onClick={() => addToCart(product._id)}
                                    />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                {addToCartLoader ? (
                                  <div><HorizotalLoader /></div>
                                ) : (
                                  <div className="ADD_button_new_home_page text-black" onClick={() => addToCart(product._id)} style={{cursor: "pointer"}} >ADD</div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    {/* </Link> */}
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
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
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
                    <path d="m12.14 8.753-5.482 4.796c.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
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
