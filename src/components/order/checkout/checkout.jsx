import React, { useState, useEffect } from 'react';
import "../../../styles/order/checkout/checkout.css";
import Orderbar from '../orderbar/orderbar';
import { makeApi } from '../../../api/callApi.tsx';
import CartCalculation from '../cart/cartCalculation';
import {  useNavigate } from 'react-router-dom'


function Checkout() {
    const navigation = useNavigate()
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectPaymentMethod, setSelectPaymentMethod] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cartItem, setCartItem] = useState([])
    const [currentPage, setCurrentPage] = useState("CHECKOUT")


console.log("payment",selectPaymentMethod)
console.log("address",selectedAddress)
console.log("cartItem",cartItem._id)

    const fetchShippingAddresses = async () => {
        try {
            setLoading(true);
            const response = await makeApi("/api/get-my-shiped-address", "GET");
            setShippingAddresses(response.data.shipedaddress);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching shipping addresses: ", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchCartItem = async () => {
            const response = await makeApi("/api/my-cart", "GET")
            setCartItem(response.data)
        }
        fetchCartItem()

    }, [])

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    }
    const handlepaymentmethodSelect = (payment) => {
        setSelectPaymentMethod(payment);
    }
    useEffect(() => {
        fetchShippingAddresses();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            shippingAddress: selectedAddress,
            paymentMethod: selectPaymentMethod,
            CartId: cartItem._id
        }
        try {
            setLoading(true);
            const response = await makeApi("/api/create-second-order", "POST", data);
            console.log("response", response)
            navigation("/product/all-products")
        }catch (error) {
            console.error("Error fetching shipping addresses: ", error);
            setLoading(false);
        }finally {
            setLoading(false);
        }
    }

    return (
        <>
            {currentPage === "CHECKOUT" ? (
                <div>
                    <div>
                        <Orderbar activeOptionName="CHECKOUT" />
                    </div>
                    <div className='main_checkout_div' >
                        {/* Shipping address */}
                        <div className="shipping-address-container Order_page_display_none ">
                            <div className="shipping-address-title">Shipping Address</div>
                            <div className="shipping-address-list">
                                {loading && <div>Loading...</div>}
                                {!loading && shippingAddresses.map((address, index) => (
                                    <div key={index} className="address-item">
                                        <input
                                            type="radio"
                                            id={`address-${index}`}
                                            name="shipping-address"
                                            value={address._id}
                                            checked={selectedAddress === address}
                                            onChange={() => handleAddressSelect(address)}
                                            className='address-radio'
                                        />
                                        <label htmlFor={`address-${index}`} className="address-label" >
                                            {`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* payment */}
                            <div  onClick={() => setCurrentPage("PAYMENT")} >
                            <CartCalculation tax={cartItem.taxPrice} shipping={cartItem.shippingPrice} total={cartItem.totalPrice} CoupanApplied={cartItem.Iscoupanapplied} Final={cartItem.TotalProductPrice} ButtonName="PROCEED TO PAYMENT" />
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <Orderbar activeOptionName="PAYMENT" />
                    </div>
                    
                    <div className='main_checkout_div' >

                    <div className='shipping-address-container' >
                        <div className="shipping-address-title">Payment Method</div>
                        <div>
                            <div className="address-item">
                                <input
                                    type="radio"
                                    id={`Cash On Delievery`}
                                    name="shipping-address"
                                    value="Cash On Delievery"
                                    checked={selectPaymentMethod === "Cash On Delievery"}
                                    onChange={() => handlepaymentmethodSelect("Cash On Delievery")}
                                    className='address-radio'
                                />
                                <label htmlFor={`payment`} className="address-label" >
                                    Case On Delivery
                                </label>
                            </div>
                            <div className="address-item">
                                <input
                                    type="radio"
                                    id={`Razorpay`}
                                    name="shipping-address"
                                    value="Razorpay"
                                    checked={selectPaymentMethod === "Razorpay"}
                                    onChange={() => handlepaymentmethodSelect("Razorpay")}
                                    className='address-radio'
                                />
                                <label htmlFor={`Payement`} className="address-label" >
                                    Razorrpay
                                </label>
                            </div>
                        </div>
                    </div>
                    <div onClick={(e)=>handleSubmit(e)} >
                        <CartCalculation tax={cartItem.taxPrice} shipping={cartItem.shippingPrice} total={cartItem.totalPrice} CoupanApplied={cartItem.Iscoupanapplied} Final={cartItem.TotalProductPrice} ButtonName="PLACE ORDER" />
                    </div>
                    </div>
                </div>
            )}


        </>
    );
}

export default Checkout;
