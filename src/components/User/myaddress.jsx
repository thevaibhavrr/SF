import React, { useState, useEffect } from 'react';
import { makeApi } from '../../api/callApi.tsx';
import UserProfileSidebar from './sidebar.jsx';

function Myaddress() {

    const [shippingAddresses, setShippingAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectPaymentMethod, setSelectPaymentMethod] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cartItem, setCartItem] = useState([])




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

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    }
    useEffect(() => {
        fetchShippingAddresses();
    }, []);
    return (
        <div>
  <div className="d-flex">
            <div className="" >
                <UserProfileSidebar />
            </div>
            <div className="shipping-address-container mt-5 pt-5 ">
                <div className="shipping-address-title">Shipping Address</div>
                <div className="shipping-address-list">
                    {loading && <div>Loading...</div>}
                    {!loading && shippingAddresses.map((address, index) => (
                        <div key={index} className="address-item">
                            {/* <input
                                type="radio"
                                id={`address-${index}`}
                                name="shipping-address"
                                value={address._id}
                                checked={selectedAddress === address}
                                onChange={() => handleAddressSelect(address)}
                                className='address-radio'
                            /> */}
                            <label htmlFor={`address-${index}`} className="address-label" >
                                {`${address.firstname} ${address.lastname}, ${address.address}, ${address.city}, ${address.state}, ${address.country}`}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    )
}

export default Myaddress