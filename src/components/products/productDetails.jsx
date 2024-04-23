import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { makeApi } from '../../api/callApi.tsx';
import "../../styles/product/productDetails.css"
import AddIcon from "../../Images/order/add_icon_green.png"
import RemoveIcon from "../../Images/order/remove_icon_red.png"
import Primaryloader from '../loaders/primaryloader.jsx';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState();
    console.log(product)
    const [selectedImage, setSelectedImage] = useState('');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
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
        fetchProduct();
    }, [productId]);
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };


    return (
        < >
            {loading ?
                <div className="All_Product_loader">
                    <div className='d-flex justify-content-center align-items-center' style={{ height: "100vh" }} >
                        <Primaryloader />
                    </div>
                </div> :
                <div>
                    {product && (
                        <div className="productDisplay">
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
                                {/* <button onClick={() => addToCart(id)}>ADD To CART</button> */}
                                <div className="productdisplay-item-cart">
                                    {/* {!cartItems[product._id] ? ( */}
                                    <div
                                        className="productdisplay-item-addto-cart "
                                    // onClick={() => addToCart(product._id)}
                                    >
                                        ADD TO CART
                                    </div>
                                    {/* ) : ( */}
                                    <div className="productdisplay-food-item-counter">
                                        <img
                                            // onClick={() => removeFromCart(product._id)}
                                            src={RemoveIcon}
                                            alt=""
                                        />
                                        <p className="productdisplay-cart-item-no">
                                            {/* {cartItems[product._id]} */}
                                        </p>
                                        <img
                                            // onClick={() => addToCart(product._id)}
                                            src={AddIcon}
                                            alt=""
                                        />
                                    </div>
                                    {/* )} */}
                                </div>
                                <button>BUY NOW</button>
                            </div>
                        </div>
                    )}

                </div>

            }
        </>
    )
}

export default ProductDetails