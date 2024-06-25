import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { makeApi } from '../../api/callApi.tsx';
import '../../styles/product/productDetails.css';
import AddIcon from '../../Images/order/add_icon_green.png';
import RemoveIcon from '../../Images/order/remove_icon_red.png';
import Primaryloader from '../loaders/primaryloader.jsx';
import BackButton from '../backButton.jsx';
import HorizotalLoader from '../loaders/horizotalLoader.jsx';
import LoginPopup from '../Auth/LoginPopup.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { addToCart, removeFromCart, fetchCart } from '../../utils/productFunction.js';

function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [productCategory, setProductCategory] = useState('');
  const [relatedCategoriesProducts, setRelatedCategoriesProducts] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(4.5);
  const [productLoaders, setProductLoaders] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userLocation = localStorage.getItem('country');

    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-single-product/${productId}`, 'GET');
      setProduct(response.data.product);
      setProductCategory(response.data.product.category._id);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductRelatedCategories = async () => {
    try {
      if (productCategory) {
        const response = await makeApi(`/api/get-all-products?category=${productCategory}&IsOutOfStock=false`, 'GET');
        setRelatedCategoriesProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart(setCartItems);
  }, []);

  useEffect(() => {
    const checkCart = async () => {
      const isInCart = cartItems.some(item => item.productId === productId);
      setIsInCart(isInCart);
    };
    checkCart();
  }, [cartItems, productId]);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 500) {
        setSlidesPerView(2);
      } else if (screenWidth <= 900) {
        setSlidesPerView(3);
      } else if (screenWidth <= 1039) {
        setSlidesPerView(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (productCategory) {
      fetchProductRelatedCategories();
    }
  }, [productCategory]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleBuyNow = async () => {
    if (!isLogin) {
      setShowPopup(true);
    } else {
      try {
        if (!isInCart) {
          await addToCart(productId, setIsLogin, setShowPopup, fetchCart, setCartItems, setProductLoaders);
          navigate('/order/my-cart');
        } else {
          navigate('/order/my-cart');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleAddToCart = (productId, quantity, availableQuantity) => {
    if (quantity < availableQuantity) {
      addToCart(productId, setIsLogin, setShowPopup, fetchCart, setCartItems, setProductLoaders);
    } else {
      toast('Cannot add more than available quantity.', { type: 'error' });
    }
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId, setProductLoaders, setCartItems, fetchCart);
  };

  const getProductQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <>
      {showPopup && <LoginPopup onClose={closePopup} />}
      <ToastContainer />
      {loading ? (
        <div className="All_Product_loader">
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Primaryloader />
          </div>
        </div>
      ) : (
        <>
          <div>
            {product && (
              <div>
                <BackButton pageLocation="/product/all-products" />
                <div className="productDisplay">
                  <div className="product-display-left">
                    <div className="productdisplay-img-list">
                      {product.image.map((item, i) => (
                        <div className="d-flex justify-content-center align-items-center" key={i}>
                          <LazyLoadImage
                            effect="blur"
                            loading="lazy"
                            src={item}
                            alt=""
                            onClick={() => handleImageClick(item)}
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="productdisplay-img">
                      <LazyLoadImage
                        effect="blur"
                        loading="lazy"
                        src={selectedImage || product.thumbnail || 'https://eu.evocdn.io/dealer/1065/catalog/product/images/cs_1612369426.png'}
                        alt=""
                        className="productdisplay-main-img"
                      />
                    </div>
                  </div>
                  <div className="product-display-right">
                    <h1>{product.name}</h1>
                    <h2>{product.subTitle}</h2>
                    <p>{product.description}</p>
                    <div className="product_details_price_div">
                      <div className="product_details_price_after_discount">
                        ₹{product.PriceAfterDiscount || product.price}
                      </div>
                      <div className="product_details_price_before_discount">₹{product.price}</div>
                      <div className="product_details_discount">{product.discountPercentage || 0}% off</div>
                    </div>
                    <div className="productdisplay-item-cart">
                      {!isInCart ? (
                        <>
                          {productLoaders[productId] ? (
                            <div className="d-flex justify-content-center">
                              <HorizotalLoader />
                            </div>
                          ) : (
                            <div
                              className="productdisplay-item-addto-cart"
                              onClick={() => handleAddToCart(product._id, getProductQuantity(product._id), product.quantity)}
                            >
                              ADD TO CART
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="productdisplay-food-item-counter ">
                          <LazyLoadImage
                            effect="blur"
                            loading="lazy"
                            onClick={() => handleRemoveFromCart(product._id)}
                            src={RemoveIcon}
                            alt=""
                          />
                          {productLoaders[productId] ? (
                            <div className="w-50">
                              <HorizotalLoader />
                            </div>
                          ) : (
                            <div className="productdisplay-cart-item-no">
                              <span>{getProductQuantity(product._id)}</span>
                            </div>
                          )}
                          <LazyLoadImage
                            effect="blur"
                            loading="lazy"
                            onClick={() => handleAddToCart(product._id, getProductQuantity(product._id), product.quantity)}
                            src={AddIcon}
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                    <button onClick={handleBuyNow}>BUY NOW</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          
          <div className="">
           
          </div> <div className='main_product_details_page_similer_product_parent_div' >
                        <div className='Similar_Products_text' >
                            Similar Products
                        </div>
                        {/* products */}
                        <div className='product_details_page_similer_product_div' >

                            <Swiper
                                slidesPerView={slidesPerView}

                                spaceBetween={20}
                                slidesPerGroup={1}
                                defaultValue={2}
                                loop={true}
                                loopFillGroupWithBlank={true}
                                // navigation={true}
                                className="mySwiper main_our_collection_swiper"
                                modules={[Navigation]}
                            >
                                {relatedCategoriesProducts && relatedCategoriesProducts.map((image, index) => (
                                    <SwiperSlide key={index} className='main_swiper_slide_our_collection' >
                                        <Link to={`/product/product-details/${image._id}`} className='css-for-link-tag' >
                                            <div className='main_our_collection_swiper_options text-center product_details_similer_product_div ' style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", cursor: "pointer", maxHeight: "300px" }} >
                                                <LazyLoadImage effect="blur" loading="lazy" src={image.thumbnail} style={{ maxWidth: "200px" }} alt={`ImagesOf ${index + 1}`} className='Our_collection_slider_images' />
                                                <div className='text-black' >{image.name}</div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}

                            </Swiper>

                        </div>
                        </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;
