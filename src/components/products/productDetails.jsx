import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { makeApi } from '../../api/callApi.tsx';
import "../../styles/product/productDetails.css"
import AddIcon from "../../Images/order/add_icon_green.png"
import RemoveIcon from "../../Images/order/remove_icon_red.png"
import Primaryloader from '../loaders/primaryloader.jsx';
import BackButton from '../backButton.jsx';
import HorizotalLoader from '../loaders/horizotalLoader.jsx';
import LoginPopup from '../Auth/LoginPopup.jsx';
import { ToastContainer, toast } from "react-toastify";
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules'


function ProductDetails() {
    const history = useNavigate();
    const { productId } = useParams();
    const [product, setProduct] = useState();
    const [selectedImage, setSelectedImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [AddTocartLoader, setAddTocartLoader] = useState(false);
    const [AddToWishlistLoader, setAddToWishlistLoader] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [isInCart, setIsInCart] = useState(false);
    const [IsLogin, setIsLogin] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [productType, setProductType] = useState("");
    const [productCatrogry, setProductCatrogry] = useState()
    const [realtedCategoriesProducts, setrealtedCategoriesProducts] = useState([])
    const [slidesPerView, setSlidesPerView] = useState(4.5);



    // fetch data


    useEffect(() => {
        const token = localStorage.getItem("token")
        const userLocation = localStorage.getItem("country")

        if (token) {
            setIsLogin(true)
            setProductType(userLocation)

        } else {
            setIsLogin(false)
        }

    }, [localStorage.getItem("token")])
    // product details
    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await makeApi(
                `/api/get-single-product/${productId}`,
                "GET"
            );
            await setProduct(response.data.product);
            setProductCatrogry(response.data.product.category._id)
        } catch (error) {
            console.error("Error fetching product details:", error);
        } finally {
            setLoading(false);
        }
    };


    const fetchProductRelatedCategories = async () => {
        try {
            if (productCatrogry) {
                const response = await makeApi(`/api/get-all-products?category=${productCatrogry}&IsOutOfStock=false`, "GET");
                setrealtedCategoriesProducts(response.data.products);
            }
        } catch (error) {
            console.log(error);
        }
    };



    // cart
    const fetchCart = async () => {
        try {
            const response = await makeApi("/api/my-cart", "GET");
            setCartItems(response.data.orderItems.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity
            })));
        } catch (error) {
            console.log(error);
        } finally {
        }
    };
    // wishlist
    const fetchWishlist = async () => {
        try {
            setAddToWishlistLoader(true);
            const response = await makeApi("/api/get-my-wishlist", "GET");
            const wishlistIds = response.data.wishlist.filter(item => item.products !== null).map(item => item.products._id);
            setWishlistItems(wishlistIds);
        } catch (error) {
            console.log(error);
        } finally {
            setAddToWishlistLoader(false);
        }
    };

    const getProductQuantity = (productId) => {
        const cartItem = cartItems.find(item => item.productId === productId);
        return cartItem ? cartItem.quantity : 0;
    };
    useEffect(() => {
        const checkCart = async () => {
            const isInCart = cartItems.some(item => item.productId === productId);
            setIsInCart(isInCart);
        };
        checkCart();
    }, [cartItems, productId]);

    // functions 

    // show image
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };
    // add to cart
    const addToCart = async (productId) => {
        if (!IsLogin) {
            setShowPopup(true);
        } else {
            try {
                setAddTocartLoader(true);
                const method = "POST";
                const endpoint = "/api/add-to-cart";
                const data = await makeApi(endpoint, method, {
                    productId, "quantity": 1,
                    "shippingPrice": 0
                });
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
                console.log(error);
            } finally {
                fetchCart();
                setAddTocartLoader(false);
            }
        }
    };
    const removeFromCart = async (productId) => {
        try {
            setAddTocartLoader(true);
            const method = "POST";
            const endpoint = "/api/remove-from-cart";
            const data = await makeApi(endpoint, method, { productId });
            setCartItems(prevState => prevState.filter(item => item.productId !== productId));

        } catch (error) {
            console.log(error);
        } finally {
            fetchCart();
            setAddTocartLoader(false);
        }
    };
    // Function to handle "BUY NOW" button click
    const handleBuyNow = async () => {
        if (!IsLogin) {
            setShowPopup(true);
        } else {
            try {
                if (!isInCart) {
                    setAddTocartLoader(true);
                    const method = 'POST';
                    const endpoint = '/api/add-to-cart';
                    await makeApi(endpoint, method, {
                        productId,
                        quantity: 1,
                        shippingPrice: 0
                    });
                    history('/order/my-cart');
                } else {
                    history('/order/my-cart');
                }
            } catch (error) {
                console.log(error);
            } finally {
                fetchCart();
                setAddTocartLoader(false);
            }
        }
    };


    // actions
    const closePopup = () => {
        setShowPopup(false);
    };
    const handleAddToCart = (productId, quantity, availableQuantity) => {
        if (quantity < availableQuantity) {
            addToCart(productId);
        } else {
            toast("Cannot add more than available quantity.", { type: "error" });
        }
    };
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
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    // call all data 

    useEffect(() => {
        // fetchProduct();
        fetchCart();
        fetchWishlist();

    }, [productId]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchProduct();
            fetchProductRelatedCategories();
        };

        fetchData();
    }, [productId]);

    useEffect(() => {
        if (productCatrogry) {
            fetchProductRelatedCategories();
        }
    }, [productCatrogry]);



    return (
        < >
            {showPopup && <LoginPopup onClose={closePopup} />}
            <ToastContainer />
            {loading ?
                <div className="All_Product_loader">
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }} >
                        <Primaryloader />
                    </div>
                </div> :
                <>
                    <div>
                        {product && (
                            <div>
                                <BackButton pageLocation="/product/all-products" />

                                <div className="productDisplay" >
                                    <div className="product-display-left">
                                        <div className="productdisplay-img-list">
                                            {product.image.map((item, i) => {
                                                return (
                                                    <div className='d-flex justify-content-center align-items-center' >
                                                        <img load="lazy"
                                                            key={i}
                                                            src={item}
                                                            alt=""
                                                            onClick={() => handleImageClick(item)}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </div>
                                                )
                                            })}

                                        </div>
                                        {selectedImage ? (
                                            <div className="productdisplay-img">
                                                <img load="lazy"
                                                    src={selectedImage  }
                                                    alt=""
                                                    

                                                    className="productdisplay-main-img"
                                                />
                                            </div>

                                        ) :
                                            <div className="productdisplay-img">
                                                <img load="lazy"
                                                    src={product.thumbnail ? product.thumbnail : `https://eu.evocdn.io/dealer/1065/catalog/product/images/cs_1612369426.png`}
                                                    alt=""
                                                    
                                                    className="productdisplay-main-img"
                                                />

                                            </div>

                                        }
                                    </div>
                                    <div className="product-display-right">
                                        <h1>{product.name}</h1>
                                        <h2>{product.subTitle}</h2>
                                        <p>{product.description}</p>
                                        <div>
                                            <div className='product_details_price_div' >
                                                <div className='product_details_price_after_discount' >₹{product.PriceAfterDiscount ? product.PriceAfterDiscount : product.price }</div>
                                                <div className='product_details_price_before_discount' >₹{product.price}</div>
                                                <div className='product_details_discount' >  {product.discountPercentage ? product.discountPercentage : 0 }% off</div>
                                            </div>
                                            
                                        </div>
                                        <div className="productdisplay-addtocart">
                                            <div className="productdisplay-item-cart">
                                                {/* <div className="productdisplay-whislist">
                         <IoIosHeart />
                     </div> */}
                                            </div>
                                        </div>
                                        <div className="productdisplay-item-cart">
                                            {!isInCart ? (
                                                <>

                                                    {AddTocartLoader ? <div className=' d-flex justify-content-center ' > <HorizotalLoader /> </div> :
                                                        <div
                                                            className="productdisplay-item-addto-cart "
                                                            onClick={() => addToCart(product._id)}
                                                        >
                                                            ADD TO CART
                                                        </div>
                                                    }
                                                </>
                                            ) : (
                                                <div className="productdisplay-food-item-counter">
                                                    <img load="lazy"
                                                        onClick={() => removeFromCart(product._id)}
                                                        src={RemoveIcon}
                                                        alt=""
                                                    />
                                                    {AddTocartLoader ? <div className='w-50 ' > <HorizotalLoader /> </div> :

                                                        <p className="productdisplay-cart-item-no">
                                                            {/* {cartItems[product._id]} */}
                                                            <span>{getProductQuantity(product._id)}</span>
                                                        </p>
                                                    }
                                                    <img load="lazy"
                                                        onClick={() => handleAddToCart(product._id, getProductQuantity(product._id), product.quantity)}
                                                        src={AddIcon}
                                                        alt=""
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <button onClick={() => handleBuyNow()} >BUY NOW</button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                    {/* related category product */}
                    <div className='main_product_details_page_similer_product_parent_div' >
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
                                {realtedCategoriesProducts && realtedCategoriesProducts.map((image, index) => (
                                    <SwiperSlide key={index} className='main_swiper_slide_our_collection' >
                                        <Link to={`/product/product-details/${image._id}`} className='css-for-link-tag' >
                                            <div className='main_our_collection_swiper_options text-center product_details_similer_product_div ' style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", cursor: "pointer" , maxHeight: "300px" }} >
                                                <img load="lazy" src={image.thumbnail} style={{ maxWidth: "200px"}} alt={`ImagesOf ${index + 1}`} className='Our_collection_slider_images' />
                                                <div className='text-black' >{image.name}</div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}

                            </Swiper>

                        </div>
                    </div>
                </>


            }
        </>
    )
}

export default ProductDetails



// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { makeApi } from '../../api/callApi.tsx';
// import "../../styles/product/productDetails.css"
// import AddIcon from "../../Images/order/add_icon_green.png"
// import RemoveIcon from "../../Images/order/remove_icon_red.png"
// import Primaryloader from '../loaders/primaryloader.jsx';
// import BackButton from '../backButton.jsx';
// import HorizotalLoader from '../loaders/horizotalLoader.jsx';
// import LoginPopup from '../Auth/LoginPopup.jsx';
// import { ToastContainer, toast } from "react-toastify";
// import { Swiper, SwiperSlide } from 'swiper/react'
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from 'swiper/modules'


// function ProductDetails() {
//     const history = useNavigate();
//     const { productId } = useParams();
//     const [product, setProduct] = useState();
//     const [selectedImage, setSelectedImage] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [AddTocartLoader, setAddTocartLoader] = useState(false);
//     const [AddToWishlistLoader, setAddToWishlistLoader] = useState(false);
//     const [wishlistItems, setWishlistItems] = useState([]);
//     const [cartItems, setCartItems] = useState([]);
//     const [isInCart, setIsInCart] = useState(false);
//     const [IsLogin, setIsLogin] = useState(false)
//     const [showPopup, setShowPopup] = useState(false);
//     const [productType, setProductType] = useState("");
//     const [productCatrogry, setProductCatrogry] = useState()
//     const [realtedCategoriesProducts, setrealtedCategoriesProducts] = useState([])
//     const [slidesPerView, setSlidesPerView] = useState(4.5);



//     // fetch data


//     useEffect(() => {
//         const token = localStorage.getItem("token")
//         const userLocation = localStorage.getItem("country")

//         if (token) {
//             setIsLogin(true)
//             setProductType(userLocation)

//         } else {
//             setIsLogin(false)
//         }

//     }, [localStorage.getItem("token")])
//     // product details
//     const fetchProduct = async () => {
//         try {
//             setLoading(true);
//             const response = await makeApi(
//                 `/api/get-single-product/${productId}`,
//                 "GET"
//             );
//             await setProduct(response.data.product);
//             setProductCatrogry(response.data.product.category._id)
//         } catch (error) {
//             console.error("Error fetching product details:", error);
//         } finally {
//             setLoading(false);
//         }
//     };


//     const fetchProductRelatedCategories = async () => {
//         try {
//             if (productCatrogry) {
//                 const response = await makeApi(`/api/get-all-products?category=${productCatrogry}&IsOutOfStock=false`, "GET");
//                 setrealtedCategoriesProducts(response.data.products);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };



//     // cart
//     const fetchCart = async () => {
//         try {
//             const response = await makeApi("/api/my-cart", "GET");
//             setCartItems(response.data.orderItems.map(item => ({
//                 productId: item.productId._id,
//                 quantity: item.quantity
//             })));
//         } catch (error) {
//             console.log(error);
//         } finally {
//         }
//     };
//     // wishlist
//     const fetchWishlist = async () => {
//         try {
//             setAddToWishlistLoader(true);
//             const response = await makeApi("/api/get-my-wishlist", "GET");
//             const wishlistIds = response.data.wishlist.filter(item => item.products !== null).map(item => item.products._id);
//             setWishlistItems(wishlistIds);
//         } catch (error) {
//             console.log(error);
//         } finally {
//             setAddToWishlistLoader(false);
//         }
//     };

//     const getProductQuantity = (productId) => {
//         const cartItem = cartItems.find(item => item.productId === productId);
//         return cartItem ? cartItem.quantity : 0;
//     };
//     useEffect(() => {
//         const checkCart = async () => {
//             const isInCart = cartItems.some(item => item.productId === productId);
//             setIsInCart(isInCart);
//         };
//         checkCart();
//     }, [cartItems, productId]);

//     // functions 

//     // show image
//     const handleImageClick = (imageUrl) => {
//         setSelectedImage(imageUrl);
//     };
//     // add to cart
//     const addToCart = async (productId) => {
//         if (!IsLogin) {
//             setShowPopup(true);
//         } else {
//             try {
//                 setAddTocartLoader(true);
//                 const method = "POST";
//                 const endpoint = "/api/add-to-cart";
//                 const data = await makeApi(endpoint, method, {
//                     productId, "quantity": 1,
//                     "shippingPrice": 0
//                 });
//                 setCartItems(prevState => {
//                     const existingItem = prevState.find(item => item.productId === productId);
//                     if (existingItem) {
//                         return prevState.map(item => {
//                             if (item.productId === productId) {
//                                 return { ...item, quantity: item.quantity + 1 };
//                             }
//                             return item;
//                         });
//                     } else {
//                         return [...prevState, { productId, quantity: 1 }];
//                     }
//                 });
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 fetchCart();
//                 setAddTocartLoader(false);
//             }
//         }
//     };
//     const removeFromCart = async (productId) => {
//         try {
//             setAddTocartLoader(true);
//             const method = "POST";
//             const endpoint = "/api/remove-from-cart";
//             const data = await makeApi(endpoint, method, { productId });
//             setCartItems(prevState => prevState.filter(item => item.productId !== productId));

//         } catch (error) {
//             console.log(error);
//         } finally {
//             fetchCart();
//             setAddTocartLoader(false);
//         }
//     };
//     // Function to handle "BUY NOW" button click
//     const handleBuyNow = async () => {
//         if (!IsLogin) {
//             setShowPopup(true);
//         } else {
//             try {
//                 if (!isInCart) {
//                     setAddTocartLoader(true);
//                     const method = 'POST';
//                     const endpoint = '/api/add-to-cart';
//                     await makeApi(endpoint, method, {
//                         productId,
//                         quantity: 1,
//                         shippingPrice: 0
//                     });
//                     history('/order/my-cart');
//                 } else {
//                     history('/order/my-cart');
//                 }
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 fetchCart();
//                 setAddTocartLoader(false);
//             }
//         }
//     };


//     // actions
//     const closePopup = () => {
//         setShowPopup(false);
//     };
//     const handleAddToCart = (productId, quantity, availableQuantity) => {
//         if (quantity < availableQuantity) {
//             addToCart(productId);
//         } else {
//             toast("Cannot add more than available quantity.", { type: "error" });
//         }
//     };
//     useEffect(() => {
//         const handleResize = () => {
//             const screenWidth = window.innerWidth;
//             if (screenWidth <= 500) {
//                 setSlidesPerView(2);
//             } else if (screenWidth <= 900) {
//                 setSlidesPerView(3);
//             } else if (screenWidth <= 1039) {
//                 setSlidesPerView(5);
//             }
//         };

//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, [])

//     // call all data 

//     useEffect(() => {
//         // fetchProduct();
//         fetchCart();
//         fetchWishlist();

//     }, [productId]);

//     useEffect(() => {
//         const fetchData = async () => {
//             await fetchProduct();
//             fetchProductRelatedCategories();
//         };

//         fetchData();
//     }, [productId]);

//     useEffect(() => {
//         if (productCatrogry) {
//             fetchProductRelatedCategories();
//         }
//     }, [productCatrogry]);



//     return (
//         < >
//             {showPopup && <LoginPopup onClose={closePopup} />}
//             <ToastContainer />
//             {loading ?
//                 <div className="All_Product_loader">
//                     <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }} >
//                         <Primaryloader />
//                     </div>
//                 </div> :
//                 <>
//                     <div>
//                         {product && (
//                             <div>
//                                 <BackButton pageLocation="/product/all-products" />

//                                 <div className="productDisplay" >
//                                     <div className="product-display-left">
//                                         <div className="productdisplay-img-list">
//                                             {product.image.map((item, i) => {
//                                                 return (
//                                                     <div className='d-flex justify-content-center align-items-center' >
//                                                         <img load="lazy"
//                                                             key={i}
//                                                             src={item}
//                                                             alt=""
//                                                             onClick={() => handleImageClick(item)}
//                                                             style={{ cursor: "pointer" }}
//                                                         />
//                                                     </div>
//                                                 )
//                                             })}

//                                         </div>
//                                         {selectedImage ? (
//                                             <div className="productdisplay-img">
//                                                 <img load="lazy"
//                                                     src={selectedImage} // Use the selected image here
//                                                     alt=""
//                                                     className="productdisplay-main-img"
//                                                 />
//                                             </div>

//                                         ) :
//                                             <div className="productdisplay-img">
//                                                 <img load="lazy"
//                                                     src={product.thumbnail}
//                                                     alt=""
//                                                     className="productdisplay-main-img"
//                                                 />

//                                             </div>

//                                         }
//                                     </div>
//                                     <div className="product-display-right">
//                                         <h1>{product.name}</h1>
//                                         <h2>{product.subTitle}</h2>
//                                         <p>{product.description}</p>
//                                         <div>
//                                             <div className='product_details_price_div' >
//                                                 <div className='product_details_price_after_discount' >₹{product.PriceAfterDiscount ? product.PriceAfterDiscount : product.price }</div>
//                                                 <div className='product_details_price_before_discount' >₹{product.price}</div>
//                                                 <div className='product_details_discount' >  {product.discountPercentage ? product.discountPercentage : 0 }% off</div>
//                                             </div>
                                            
//                                         </div>
//                                         <div className="productdisplay-addtocart">
//                                             <div className="productdisplay-item-cart">
//                                                 {/* <div className="productdisplay-whislist">
//                          <IoIosHeart />
//                      </div> */}
//                                             </div>
//                                         </div>
//                                         <div className="productdisplay-item-cart">
//                                             {!isInCart ? (
//                                                 <>

//                                                     {AddTocartLoader ? <div className=' d-flex justify-content-center ' > <HorizotalLoader /> </div> :
//                                                         <div
//                                                             className="productdisplay-item-addto-cart "
//                                                             onClick={() => addToCart(product._id)}
//                                                         >
//                                                             ADD TO CART
//                                                         </div>
//                                                     }
//                                                 </>
//                                             ) : (
//                                                 <div className="productdisplay-food-item-counter">
//                                                     <img load="lazy"
//                                                         onClick={() => removeFromCart(product._id)}
//                                                         src={RemoveIcon}
//                                                         alt=""
//                                                     />
//                                                     {AddTocartLoader ? <div className='w-50 ' > <HorizotalLoader /> </div> :

//                                                         <p className="productdisplay-cart-item-no">
//                                                             {/* {cartItems[product._id]} */}
//                                                             <span>{getProductQuantity(product._id)}</span>
//                                                         </p>
//                                                     }
//                                                     <img load="lazy"
//                                                         onClick={() => handleAddToCart(product._id, getProductQuantity(product._id), product.quantity)}
//                                                         src={AddIcon}
//                                                         alt=""
//                                                     />
//                                                 </div>
//                                             )}
//                                         </div>
//                                         <button onClick={() => handleBuyNow()} >BUY NOW</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                     </div>
//                     {/* <div className='main_product_details_page_similer_product_parent_div' >
//                         <div className='Similar_Products_text' >
//                             Similar Products
//                         </div>
//                         <div className='product_details_page_similer_product_div' >

//                             <Swiper
//                                 slidesPerView={slidesPerView}

//                                 spaceBetween={20}
//                                 slidesPerGroup={1}
//                                 defaultValue={2}
//                                 loop={true}
//                                 loopFillGroupWithBlank={true}
//                                 // navigation={true}
//                                 className="mySwiper main_our_collection_swiper"
//                                 modules={[Navigation]}
//                             >
//                                 {realtedCategoriesProducts && realtedCategoriesProducts.map((image, index) => (
//                                     <SwiperSlide key={index} className='main_swiper_slide_our_collection' >
//                                         <Link to={`/product/product-details/${image._id}`} className='css-for-link-tag' >
//                                             <div className='main_our_collection_swiper_options' >
//                                                 <img load="lazy" src={image.thumbnail} alt={`ImagesOf ${index + 1}`} className='Our_collection_slider_images' />
//                                                 <div className='text-black' >{image.name}</div>
//                                             </div>
//                                         </Link>
//                                     </SwiperSlide>
//                                 ))}

//                             </Swiper>

//                         </div>
//                     </div> */}
//                 </>


//             }
//         </>
//     )
// }

// export default ProductDetails