import React, { useEffect, useState } from 'react'
import "../../../styles/order/cart/cartItem.css"
import { makeApi } from '../../../api/callApi.tsx'
import CartCalculation from './cartCalculation.jsx'
import Orderbar from '../orderbar/orderbar.jsx'
function CartItem() {
    const [cartItem, setCartItem] = useState([])
    const [loading, setLoading] = useState(false);
    const [cartPoductList, setCartProductList] = useState([])
    console.log(cartItem)
    const fetchCartItem = async () => {
        const response = await makeApi("/api/my-cart", "GET")
        setCartItem(response.data)
        setCartProductList(response.data.orderItems)
    }

    const removeFromCart = async (productId) => {
        try {
            setLoading(true);
            const method = "POST";
            const endpoint = "/api/remove-from-cart";
            const data = await makeApi(endpoint, method, { productId });
            // setCartItems(prevState => prevState.filter(item => item.productId !== productId));

        } catch (error) {
            console.log(error);
        } finally {
            fetchCartItem()
            setLoading(false);
        }
    };
    const addToCart = async (productId) => {
        try {
            setLoading(true);
            const method = "POST";
            const endpoint = "/api/add-to-cart";
            const data = await makeApi(endpoint, method, {
                productId, "quantity": 1,
                "shippingPrice": 0
            });

        } catch (error) {
            console.log(error);
        } finally {
            fetchCartItem()

        }

    }
    useEffect(() => {
        fetchCartItem()
    }, [])
    return (
        <>
            <div>
                <Orderbar activeOptionName="CART" />
            </div>
            <div className='cart_item_main_div' >
                {/* product details */}
                {/* haader */}
                <div className='cart_item_header' >
                    <div></div>

                    <div>Product Name:</div>
                    <div>Price:</div>
                    <div>Qty:</div>
                    <div>Total</div>
                </div>
                {/* details */}
                {cartPoductList && cartPoductList.map((item) => (
                    <div className='cart_item_details_parent_div' >
                        <div className='cart_item_details' >
                            <div>
                                <img src={item.productId.thumbnail} alt=' product ' className='cart_item_image' />
                            </div>
                            <div> {item.productId.name} </div>
                            <div> ₹ {item.productId.price} </div>
                            <div className="cart-quantity">
                                <button onClick={() => removeFromCart(item.productId._id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => addToCart(item.productId._id)}>+</button>
                            </div>
                            {/* <div> {item.quantity} </div> */}
                            <div> ₹ {item.totalPrice} </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* calculation */}
            <div className='cart_calculation_main_div_cartItem ' >
                <CartCalculation tax={cartItem.taxPrice} shipping={cartItem.shippingPrice} total={cartItem.totalPrice} CoupanApplied={cartItem.Iscoupanapplied} Final={cartItem.TotalProductPrice} ButtonName="PROCEED TO CHECKOUT" />
            </div>

        </>
    )
}

export default CartItem