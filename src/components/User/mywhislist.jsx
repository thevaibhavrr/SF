import React, { useEffect, useState } from 'react';
import "../../styles/product/allproduct.css";
import { IoIosHeart } from "react-icons/io";
import { makeApi } from '../../api/callApi.tsx';
import AddIcon from "../../Images/order/add_icon_green.png"
import RemoveIcon from "../../Images/order/remove_icon_red.png"
import Primaryloader from '../loaders/primaryloader.jsx';
import Heartloader from '../loaders/hearloader.jsx';
import HorizotalLoader from '../loaders/horizotalLoader.jsx';
import { Link } from "react-router-dom"
import UserProfileSidebar from './sidebar.jsx';

function Mywhislist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [watchlistProducts, setWatchlistProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [AllProductLoader, setAllProductLoader] = useState(false);
    const [IsLogin, setIsLogin] = useState(false)
    const [showPopup, setShowPopup] = useState(false);

    const [AddToWishlistLoader, setAddToWishlistLoader] = useState({});
    const [productLoaders, setProductLoaders] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }

    }, [localStorage.getItem("token")])




    const fetchWishlist = async () => {
        try {
            const response = await makeApi("/api/get-my-wishlist", "GET");
            setWatchlistProducts(response.data.wishlist)
            const wishlistIds = response.data.wishlist.filter(item => item.products !== null).map(item => item.products._id);
            setWishlistItems(wishlistIds);
        } catch (error) {
            console.log(error);
        } finally {
        }
    };
    useEffect(() => {

        fetchWishlist();
    }, []);


    const isInCart = (productId) => {
        return cartItems.some(item => item.productId === productId);
    };
    const closePopup = () => {
        setShowPopup(false);
    };


    const toggleWishlist = async (id) => {
        if (!IsLogin) {
            setShowPopup(true);
        } else {
            try {
                setAddToWishlistLoader(prevState => ({
                    ...prevState,
                    [id]: true
                }))
                const method = "POST";
                const endpoint = `/api/create-wishlist/${id}`;
                const data = await makeApi(endpoint, method);
                setWishlistItems(prevState => {
                    if (prevState.includes(id)) {
                        return prevState.filter(itemId => itemId !== id);
                    } else {
                        return [...prevState, id];
                    }
                });
            } catch (error) {
                console.log(error);
            } finally {
                fetchWishlist();

                setAddToWishlistLoader(prevState => ({
                    ...prevState,
                    [id]: false
                }))

            }
        }

    };

    const addToCart = async (productId) => {
        if (!IsLogin) {
            setShowPopup(true);
        } else {
            try {
                setProductLoaders(prevState => ({
                    ...prevState,
                    [productId]: true
                }));
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
                console.log(error.response.data);
            } finally {
                setProductLoaders(prevState => ({
                    ...prevState,
                    [productId]: false
                }));
            }
        }
    };

    const removeFromCart = async (productId) => {
        try {
            setProductLoaders(prevState => ({
                ...prevState,
                [productId]: true
            }));
            const method = "POST";
            const endpoint = "/api/remove-from-cart";
            const data = await makeApi(endpoint, method, { productId });
            setCartItems(prevState => prevState.filter(item => item.productId !== productId));

        } catch (error) {
            console.log(error);
        } finally {
            setProductLoaders(prevState => ({
                ...prevState,
                [productId]: false
            }));
        }
    };

    const getProductQuantity = (productId) => {
        const cartItem = cartItems.find(item => item.productId === productId);
        return cartItem ? cartItem.quantity : 0;
    };


    return (
        <>
            <div className="d-flex">
                <div className="my_wishlist_mobile_view" >
                    <UserProfileSidebar />
                </div>

                <div className='top_parent_div_all_product' >
                    {AllProductLoader ? <div className="All_Product_loader">
                        <div className='' >
                            <Primaryloader />
                        </div>
                    </div> :

                        <div className="">
                            <div className="main_all_product_div">
                                {watchlistProducts.map((product, index) => {
                                    return <div className="product_div_all_product_parent" key={index}>
                                        <div className="product_div_all_product">
                                            <Link to={`/product/product-details/${product.products._id}`} >
                                                <div>
                                                    <img load="lazy" src={product.products.thumbnail} alt="product" className="all_product_product_thumbnail" />
                                                </div>
                                            </Link>
                                            <div className="product_name_and_price">
                                                <div>{product.products.name}</div>
                                                <div>₹{product.products.PriceAfterDiscount}</div>
                                            </div>
                                            <div className="Add_to_cart_and_watchlist_button">
                                                <>
                                                    {isInCart(product.products._id) ? (
                                                        <div className='Add_to_cart_and_watchlist_child'>
                                                            {productLoaders[product.products._id] ? <div> <HorizotalLoader /> </div> :
                                                                <div className="cart-quantity">
                                                                    <img load="lazy" src={RemoveIcon} alt="AddIcon" className='Icon_add_to_cart' onClick={() => removeFromCart(product.products._id)} />
                                                                    <span>{getProductQuantity(product.products._id)}</span>
                                                                    <img load="lazy" src={AddIcon} alt="AddIcon" className='Icon_add_to_cart' onClick={() => addToCart(product.products._id)} />
                                                                </div>
                                                            }
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {productLoaders[product.products._id] ? <div> <HorizotalLoader /> </div> : <div className="Add_to_cart_button" onClick={() => addToCart(product.products._id)}>Add to Cart</div>}
                                                        </div>
                                                    )}
                                                </>


                                                <div className='Add_to_cart_and_watchlist_child'>
                                                    {AddToWishlistLoader[product.products._id] ? <div className='heart_loader_all_product' > <Heartloader /></div> : <IoIosHeart
                                                        className={`watchlist-icon pointer-event ${wishlistItems.includes(product.products._id) ? "wishlist-active" : ""}`}
                                                        onClick={() => toggleWishlist(product.products._id)}
                                                    />}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>

                        </div>
                    }
                </div>

            </div>
        </>

    );
}

export default Mywhislist;
