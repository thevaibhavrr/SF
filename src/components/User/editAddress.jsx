import React, { useState, useEffect } from 'react';
import { makeApi } from '../../api/callApi.tsx';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "../../styles/Information/billingAdress.css";
import Primaryloader from '../loaders/primaryloader.jsx';


function EditAddress() {
    const navigate = useNavigate();
    const { addressId } = useParams();

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
        address: "",
        pincode: "",
        country: "",
        state: "",
        city: ""
    });

    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        // Limit phone number input to maximum 10 digits
        if (name === "phonenumber" && value.length > 10) {
            return; // Do not update state if more than 10 digits
        }

        setFormData({
            ...formData,
            [name]: value
        });

        // Fetch details based on pincode
        if (name === "pincode" && value.length === 6) {
            await searchPin(value);
        }
    };

    const searchPin = async (pin) => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
            const data = await response.json();

            if (data && data.length > 0 && data[0].Status === 'Success') {
                const addressDetails = data[0].PostOffice[0];
                setFormData({
                    ...formData,
                    country: addressDetails.Country,
                    state: addressDetails.State,
                    city: addressDetails.District
                });
            } else {
                toast.error('Invalid pincode');
                setFormData({
                    ...formData,
                    country: '',
                    state: '',
                    city: ''
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchShippingAddress = async () => {
        try {
            setLoading(true);
            const response = await makeApi(`/api/get-shiped-address-by-id/${addressId}`, "GET");
            setFormData(response.data.shipedaddress);
        } catch (error) {
            console.error("Error fetching shipping address:", error);
            toast.error("Error fetching shipping address");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const response = await makeApi(`/api/update-shiped-address/${addressId}`, "PUT", formData);
            if (response.data.success === true) {
                toast.success("Address updated successfully", {
                    onClose: () => {
                        navigate("/user/my-address");
                    }
                });
            }
        } catch (error) {
            console.error("Error updating address:", error);
            toast.error(error.response.data.message || "Error updating address");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchShippingAddress();
    }, []);

    return (
        <>
          {loading && (
        <div style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "9999",
          backgroundColor: "rgba(0, 0, 0, 0.8)"
        }}>
          <Primaryloader />
        </div>
      )}
            <ToastContainer autoClose={1000} />
            <div className='ms-5 mt-3'>
                <Link to={"/user/my-address"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                    </svg>
                </Link>
            </div>
            <div className="my-shipping-belling-address">
                <form action="" className="address-form" onSubmit={handleSubmit}>
                    <div className="my-billing-address">
                        <h2>Shipping Address</h2>
                        <div className="add-state-city">
                            <input
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={formData.firstname}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                value={formData.lastname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            type="text"
                            name="phonenumber"
                            placeholder="Phone Number"
                            value={formData.phonenumber}
                            onChange={handleInputChange}
                            maxLength={10}
                        />
                        <textarea
                            name="address"
                            cols="30"
                            rows="5"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                        ></textarea>
                        <div className="add-pin-country">
                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="add-state-city">
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button className="edit-address-btn" type="submit" disabled={submitting}>
                            {submitting ? "Submitting..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditAddress;
