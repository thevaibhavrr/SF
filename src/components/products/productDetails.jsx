import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { makeApi } from '../../api/callApi.tsx';
import "../../styles/product/productDetails.css"
import AddIcon from "../../Images/order/add_icon_green.png"
import RemoveIcon from "../../Images/order/remove_icon_red.png"
import Primaryloader from '../loaders/primaryloader.jsx';
import BackButton from '../backButton.jsx';
import HorizotalLoader from '../loaders/horizotalLoader.jsx';
import LoginPopup from '../Auth/LoginPopup.jsx';
import { ToastContainer, toast } from "react-toastify";

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


    // fetch data

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            setIsLogin(true)
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
            setProduct(response.data.product);
        } catch (error) {
            console.error("Error fetching product details:", error);
        } finally {
            setLoading(false);
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
        }else{
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
        } else{
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

    // call all data 

    useEffect(() => {
        fetchProduct();
        fetchCart();
        fetchWishlist();
    }, [productId]);


    return (
        < >
            {showPopup && <LoginPopup onClose={closePopup} />}
<ToastContainer/>
            {loading ?
                <div className="All_Product_loader">
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }} >
                        <Primaryloader />
                    </div>
                </div> :
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
                                                    <img
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
                                            <img
                                                src={selectedImage} // Use the selected image here
                                                alt=""
                                                className="productdisplay-main-img"
                                            />
                                        </div>

                                    ) :
                                        <div className="productdisplay-img">
                                            <img
                                                src={product.thumbnail}
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
                                                <img
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
                                                <img
                                                    onClick={() =>  handleAddToCart(product._id,getProductQuantity(product._id),product.quantity)}
                                                    src={AddIcon}
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={()=>handleBuyNow()} >BUY NOW</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            }
        </>
    )
}

export default ProductDetails