
import React, { useState } from "react";
import axios from "axios";
import { makeApi } from "../../api/callApi.tsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Primaryloader from "../loaders/primaryloader.jsx";
import "../../styles/Information/billingAdress.css";

const ShippingAddress = () => {
  const navigate = useNavigate();

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
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

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

    // Add code to handle pincode search if needed
    if (name === "pincode" && value.length === 6) {
      await searchPin(value);
    }
  };

  const searchPin = async (pin) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
      const data = response.data;

      if (data && data.length > 0 && data[0].Status === 'Success') {
        setFormData((prevFormData) => ({
          ...prevFormData,
          country: data[0].PostOffice[0].Country,
          state: data[0].PostOffice[0].State,
          city: data[0].PostOffice[0].District
        }));
      } else {
        toast.error('Invalid pincode');
        setFormData((prevFormData) => ({
          ...prevFormData,
          country: '',
          state: '',
          city: ''
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstname) {
      toast.error('Please fill firstname');
      return;
    }
    if (!formData.lastname) {
      toast.error('Please fill lastname');
      return;
    }
    if (!formData.phonenumber) {
      toast.error('Please fill phonenumber');
      return;
    }
    if (!formData.address) {
      toast.error('Please fill address');
      return;
    }
    if (!formData.pincode) {
      toast.error('Please fill pincode');
      return;
    }
    if (!formData.country) {
      toast.error('Please fill country');
      return;
    }
    if (!formData.state) {
      toast.error('Please fill state');
      return;
    }

    try {
      setSubmitting(true);
      const response = await makeApi("/api/create-shiped-address", "POST", formData);
      if (response.data.success === true) {
        toast.success(response.data.message, {
          onClose: () => {
            navigate("/user/my-address")
          }
        })
        setFormData({
          firstname: "",
          lastname: "",
          phonenumber: "",
          address: "",
          pincode: "",
          country: "",
          state: "",
          city: ""
        });
      }
    } catch (error) {
      console.error("Error creating address:", error);
      toast.error(error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  }

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
      <div className="my-shipping-belling-address">
        <form action="" className="address-form" onSubmit={handleSubmit}>
          <div className="my-billing-address">
            <h2>Shipping Address</h2>
            <div className="add-state-city">
              <input
                type="text"
                name="firstname"
                placeholder="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>
            <input
              type="number"
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
                readOnly
              />
            </div>
            <div className="add-state-city">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                readOnly
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                readOnly
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
};

export default ShippingAddress;
