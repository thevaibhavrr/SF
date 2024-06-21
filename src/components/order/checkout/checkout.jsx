import React, { useState, useEffect } from 'react';
import "../../../styles/order/checkout/checkout.css";
import Orderbar from '../orderbar/orderbar';
import { makeApi } from '../../../api/callApi.tsx';
import CartCalculation from '../cart/cartCalculation';
import { Link, useNavigate } from 'react-router-dom';
import SucessGIF from '../../../Images/order/Order Placed GIF.gif';
import Primaryloader from '../../loaders/primaryloader.jsx';
import { ToastContainer, toast } from "react-toastify";

function Checkout() {
    const navigation = useNavigate();
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectPaymentMethod, setSelectPaymentMethod] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const [currentPage, setCurrentPage] = useState("CHECKOUT");
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);


    useEffect(() => {
        const fetchCartItem = async () => {
            const response = await makeApi("/api/my-cart", "GET");
            setCartItem(response.data);
        }
        fetchCartItem();
    }, []);

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
        fetchShippingAddresses();
    }, []);

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    }

    const handlepaymentmethodSelect = (payment) => {
        setSelectPaymentMethod(payment);
    }

    const handleSubmit = async (event) => {
        if (!selectPaymentMethod) {
            toast("Please select payment method")
            return
        }
        event.preventDefault();
        const data = {
            shippingAddress: selectedAddress,
            paymentMethod: selectPaymentMethod,
            CartId: cartItem._id
        }
        try {
            setLoading(true);
            const response = await makeApi("/api/create-second-order", "POST", data);
            setOrderPlaced(true);
            setTimeout(() => {
                setOrderPlaced(false);
                navigation("/product/all-products");
            }, 5000);
        } catch (error) {
            console.error("Error fetching shipping addresses: ", error);
        } finally {
            setLoading(false);
        }
    }
    const ManageCurrnetPage = (e) => {
        e.preventDefault()
        if (!selectedAddress) {
            toast("Please select shipping address")
        } else {
            setCurrentPage("PAYMENT")
        }

    }

    const handleDeleteClick = (addressId) => {
        setSelectedAddress(addressId);
        setShowDeletePopup(true);
    }

    const confirmDelete = async () => {
        try {
            await makeApi(`/api/delete-shiped-address/${selectedAddress}`, "DELETE");
            // After deletion, fetch the updated list of addresses
            fetchShippingAddresses();
        } catch (error) {
            console.error("Error deleting shipping address: ", error);
        } finally {
            setSelectedAddress(null);
            setShowDeletePopup(false);
        }
    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            {orderPlaced && (
                <div className="success-gif-container">
                    <img loading="lazy" src={SucessGIF} alt="Success GIF" className='success-gif' />
                </div>
            )}
            {!orderPlaced && (

                <div>
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
                                        {loading && <div> <Primaryloader /> </div>}
                                        {shippingAddresses.length === 0 && <div className='d-flex justify-content-center align-items-center w-100 '> <Link to={"/user/address/add-address"} className='css-for-link-tag' > <div className='click_buttons_second  text-center'> Add Address </div> </Link> </div>}
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
                                                <div className='select_button_my_address_div'>
                                                    <div>
                                                        <Link to={`/user/address/edit-address/${address._id}`}>
                                                            <div>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                                                </svg>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <svg onClick={() => handleDeleteClick(address._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                        ))}
                                        <div className='d-flex justify-content-center align-items-center w-100 '> <Link to={"/user/address/add-address"} className='css-for-link-tag' > <div className='click_buttons_second  text-center mt-5 '> Add More </div> </Link> </div>
                                    </div>
                                </div>
                                {/* payment */}
                                <div onClick={(e) => ManageCurrnetPage(e)} >
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
                                        <div className="address-item" onClick={() => handlepaymentmethodSelect("Cash On Delievery")} >
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
                                                Cash On Delievery
                                            </label>
                                        </div>
                                        <div className="address-item" onClick={() => handlepaymentmethodSelect("Razorpay")}>
                                            <input
                                                type="radio"
                                                id={`Razorpay`}
                                                name="shipping-address"
                                                value="Razorpay"
                                                checked={selectPaymentMethod === "Razorpay"}
                                                onChange={() => handlepaymentmethodSelect("Razorpay")}
                                                className='address-radio'
                                            />
                                            <label htmlFor={`payment`} className="address-label" >
                                                Razorpay
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={(e) => handleSubmit(e)} >
                                    <CartCalculation tax={cartItem.taxPrice} shipping={cartItem.shippingPrice} total={cartItem.totalPrice} CoupanApplied={cartItem.Iscoupanapplied} Final={cartItem.TotalProductPrice} ButtonName="PLACE ORDER" />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
            {showDeletePopup && (
                <div className="delete-popup">
                    <div className="delete-popup-content">
                        <h3>Are you sure you want to delete this address?</h3>
                        <div className="delete-popup-buttons">
                            <button onClick={confirmDelete}>Delete</button>
                            <button onClick={() => setShowDeletePopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default Checkout;
