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
import LoginPopup from '../Auth/LoginPopup.jsx';
import { ToastContainer, toast } from "react-toastify";
import { addToCart, removeFromCart  } from '../../utils/productFunction.js';
import Scroll from '../scroll/smoothscroll.js';
import Ecombar from '../Header/ecombar.jsx';

function Allproduct({ search, category, minPrice, maxPrice }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [ResultPerPage, setResultPerPage] = useState(26);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [toalProduct, setToalProduct] = useState(0);
    const [AllProductLoader, setAllProductLoader] = useState(false);
    const [IsLogin, setIsLogin] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [productType, setProductType] = useState("");

    const [AddToWishlistLoader, setAddToWishlistLoader] = useState({});
    const [productLoaders, setProductLoaders] = useState({});

    useEffect(() => {
        const token = localStorage.getItem("token")
        const userLocation = localStorage.getItem("country")
        if (token) {
            setIsLogin(true)
            setProductType(userLocation)
        } else {
            setIsLogin(false)
        }
    }, [])

    const fetchProduct = async () => {
        try {
            setAllProductLoader(true);
            console.log(search)
            const response = await makeApi(`/api/get-all-products?name=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${currentPage}&perPage=${ResultPerPage}&productType=${productType}&IsOutOfStock=false`, "GET");
             console.log(response.data)
            setProducts(response.data.products);
            setToalProduct(response.data.totalProducts);
        } catch (error) {
            console.log(error);
        } finally {
            setAllProductLoader(false);
        }
    };

    useEffect(() => {
        const a = Math.ceil(toalProduct / ResultPerPage);
        setTotalPages(a);
    }, [products, ResultPerPage]);

    const fetchCart = async () => {
        try {
            const response = await makeApi("/api/my-cart", "GET");
            setCartItems(response.data.orderItems.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity
            })));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await makeApi("/api/get-my-wishlist", "GET");
                const wishlistIds = response.data.wishlist.filter(item => item.products !== null).map(item => item.products._id);
                setWishlistItems(wishlistIds);
            } catch (error) {
                console.log(error);
            }
        };

        fetchWishlist();
    }, []);

    useEffect(() => {
        fetchProduct();
        fetchCart();
    }, [search, category, minPrice, maxPrice, currentPage, ResultPerPage]);

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
                await makeApi(endpoint, method);
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
                setAddToWishlistLoader(prevState => ({
                    ...prevState,
                    [id]: false
                }))
            }
        }
    };
   

    const getProductQuantity = (productId) => {
        const cartItem = cartItems.find(item => item.productId === productId);
        return cartItem ? cartItem.quantity : 0;
    };
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddToCart = (productId, quantity, availableQuantity) => {
        if (quantity < availableQuantity) {
            addToCart(productId, setIsLogin, setShowPopup, fetchCart, setCartItems, setProductLoaders);
        } else {
            toast("Cannot add more than available quantity.", { type: "error" });
        }
    };

    return (
        <>
            {showPopup && <LoginPopup onClose={closePopup} />}
            <ToastContainer />

            <div className='top_parent_div_all_product'>
                {AllProductLoader ? (
                    <div className="All_Product_loader">
                        <div className=''>
                            <Primaryloader />
                        </div>
                    </div>
                ) : (
                    <div className="">
                         {/* <Scroll/> */}
                        <div className="main_all_product_div">
                            {products.map((product, index) => (
                                
                                <div className="product_div_all_product_parent" key={index}>
                                    <div className="product_div_all_product">
                                        <Link to={`/product/product-details/${product._id}`} >
                                            <div>
                                                <img load="lazy" src={product.thumbnail} alt="product" className="all_product_product_thumbnail" loading='lazy' />
                                            </div>
                                        </Link>
                                        <div className="product_name_and_price">
                                            <div className='All_product_name' >{product.name}</div>
                                        </div>
                                            <div className='All_product_description' >{product?.description}</div>
                                        <div>
                                            <div className='All_product_price_div' >
                                                {/* <div className='All_product_price_after_discount' >₹{product?.PriceAfterDiscount}</div> */}
                                                <div className='All_product_price_after_discount' >₹{product?.price}</div>
                                                <div className='All_product_price_before_discount' >₹{product?.price}</div>
                                                <div className='All_product_discount' >  {product?.discountPercentage}% off</div>
                                            </div>

                                        </div>
                                        <div className="Add_to_cart_and_watchlist_button">
                                            <>
                                                {isInCart(product?._id) ? (
                                                    <div className='Add_to_cart_and_watchlist_child'>
                                                        {productLoaders[product?._id] ? (
                                                            <div>
                                                                <HorizotalLoader />
                                                            </div>
                                                        ) : (
                                                            <div className="cart-quantity">
                                                                <img load="lazy" src={RemoveIcon} alt="AddIcon" className='Icon_add_to_cart' onClick={() => removeFromCart(product?._id,setProductLoaders,setCartItems,fetchCart)} />
                                                                <span>{getProductQuantity(product?._id)}</span>
                                                                <img load="lazy" src={AddIcon} alt="AddIcon" className='Icon_add_to_cart' onClick={() => handleAddToCart(product?._id, getProductQuantity(product?._id), product?.quantity)} />
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div>
                                                        {productLoaders[product?._id] ? (
                                                            <div>
                                                                <HorizotalLoader />
                                                            </div>
                                                        ) : (
                                                            <div className="Add_to_cart_button" onClick={() => handleAddToCart(product?._id, getProductQuantity(product?._id), product?.quantity)}>Add to Cart</div>
                                                            // <div className="Add_to_cart_button" onClick={() => addToCartFun(product?._id)}>Add to Cart</div>
                                                        )}
                                                    </div>
                                                )}
                                            </>

                                            <div className='Add_to_cart_and_watchlist_child'>
                                                {AddToWishlistLoader[product?._id] ? <div className='heart_loader_all_product' > <Heartloader /></div> : <IoIosHeart
                                                    className={`watchlist-icon pointer-event ${wishlistItems.includes(product?._id) ? "wishlist-active" : ""}`}
                                                    onClick={() => toggleWishlist(product?._id)}
                                                />}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                                (pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        className={pageNumber === currentPage ? "active" : ""}
                                        onClick={() => handlePageClick(pageNumber)}
                                    >
                                        {pageNumber}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                )
                }
            </div>
            {/* <Ecombar /> */}

        </>

    );
}

export default Allproduct;
