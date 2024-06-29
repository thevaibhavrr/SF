import React, { useEffect, useState } from 'react';
import "../../../styles/NewHome/ProductCard.css"
import productImage from '../../../assets/img/NewHome/Mumtaz 1.png'; // Replace with your image path
import offerImage from '../../../assets/img/NewHome/offerImage.png'
import AsAD from '../../../assets/img/NewHome/AsAD.svg'
import RIC from '../../../assets/img/NewHome/RIC.svg'
import { makeApi } from '../../../api/callApi.tsx';
import { Link } from 'react-router-dom';
import AddIcon from "../../../Images/order/add_icon_green.png";
import RemoveIcon from "../../../Images/order/remove_icon_red.png";
import HorizotalLoader from '../../loaders/horizotalLoader.jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ProductLloader from '../../loaders/productLoader.jsx';

const NewHomeProducts = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [allProductLoader, setAllProductLoader] = useState(false);
    const [addToCartLoader, setAddToCartLoader] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [productType, setProductType] = useState("");
    const [productLoader,setProductLoader] = useState(true)

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

    const fetchProduct = async () => {
        try {
            setAllProductLoader(true);
            setProductLoader(true)
            const response = await makeApi(`/api/get-all-products?&perPage=10&category=665d67c04133e96dad0359a4&productType=${productType}&IsOutOfStock=false&ResultsPerPage=3`, "GET");
            setProducts(response.data.products);
        } catch (error) {
            console.log(error);
        } finally {
            setAllProductLoader(false);
            // setProductLoader(false)
        }
    };

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
        fetchProduct();
    }, [productType]);

    useEffect(() => {
        fetchCart();
    }, []);

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
                setAddToCartLoader(prevState => ({ ...prevState, [productId]: true }));
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
                setAddToCartLoader(prevState => ({ ...prevState, [productId]: false }));
            }
        }
    };

    const removeFromCart = async (productId) => {
        try {
            setAddToCartLoader(prevState => ({ ...prevState, [productId]: true }));
            const existingItem = cartItems.find(item => item.productId === productId);
            if (existingItem.quantity > 1) {
                await makeApi("/api/update-cart", "POST", { productId, quantity: existingItem.quantity - 1 });
                setCartItems(prevState => 
                    prevState.map(item => 
                        item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item
                    )
                );
            } else {
                await makeApi("/api/remove-from-cart", "POST", { productId });
                setCartItems(prevState => prevState.filter(item => item.productId !== productId));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setAddToCartLoader(prevState => ({ ...prevState, [productId]: false }));
        }
    };

    return (
        <div className="product_card_container_New_home py-5 my-5 ">
            {products.map((product) => (
                <div key={product._id} className="product_card">
                    
                    <div className='new_product_product_and_offer_image'>
                        <>
                        <div className='offer_image_div' >
                            <LazyLoadImage effect="blur"
                                    loading="lazy" src={offerImage} alt="offer" className="offerImage" />
                        </div>
                      
                        <div>
                            <LazyLoadImage effect="blur"
                                    loading="lazy" src={product.thumbnail} alt={product.name} className="product_image" />
                        </div>
                        </>
                    </div>
                    {/* bottom */}
                    <div className='d-flex flex-column gap-2'>
                        <div className='New_Home_product_name_and_weight' >
                            <div>{product.name}</div>
                            <div>{product.description}</div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center gap-2'>
                                <div className="new-price">{product.PriceAfterDiscount}</div>
                                <div className="old-price">{product.price}</div>
                            </div>
                            <div className=''>
                                {isInCart(product._id) ? (
                                    <div className='Add_to_cart_and_watchlist_child'>
                                        {addToCartLoader[product._id] ? (
                                            <div className="loader">
                                                <HorizotalLoader/>
                                                
                                            </div>
                                        ) : (
                                            <div className="cart-quantity d-flex gap-2 align-items-center">
                                                <LazyLoadImage effect="blur"
                                    loading="lazy"
                                                    src={RemoveIcon}
                                                    alt="RemoveIcon"
                                                    className='Icon_add_to_cart'
                                                    onClick={() => removeFromCart(product._id)}
                                                    style={{ cursor: "pointer" }}
                                                />
                                                <span>{getProductQuantity(product._id)}</span>
                                                <LazyLoadImage effect="blur"
                                    loading="lazy"
                                                    src={AddIcon}
                                                    alt="AddIcon"
                                                    className='Icon_add_to_cart'
                                                    onClick={() => addToCart(product._id)}
                                                    style={{ cursor: "pointer" }}

                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        {addToCartLoader[product._id] ? (
                                            <div className="loader">
                                                <HorizotalLoader/>
                                            </div>
                                        ) : (
                                            <div className="ADD_button_new_home_page" onClick={() => addToCart(product._id)} style={{ cursor: "pointer" }}>ADD</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NewHomeProducts;
