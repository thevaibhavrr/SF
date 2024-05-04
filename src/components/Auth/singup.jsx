
// import React, { useState, useMemo } from 'react';
// import countryList from 'react-select-country-list';

// function CountrySelector() {
//   const [value, setValue] = useState('');
//   const options = useMemo(() => countryList().getData(), []);

//   const changeHandler = event => {
//     setValue(event.target.value);
//   };

//   return (
// <select value={value} onChange={changeHandler}>
//   <option value="">Select a country</option>
//   {options.map(option => (
//     <option key={option.value} value={option.value}>
//       {option.label}
//     </option>
//   ))}
// </select>
//   );
// }

// export default CountrySelector;

import React, { useEffect, useState, useMemo } from "react"
import countryList from 'react-select-country-list'
import { makeApi } from "../../api/callApi.tsx"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Auth/singup.css"


const Signup = () => {
    const navigate = useNavigate()
    const options = useMemo(() => countryList().getData(), []);


    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        mobileNumber: "",
        country: "",
    })
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

console.log(formData)
    const signup = async () => {

        if (!formData.email) {
            toast.error("Please fill email")
            return
        }
        if (!formData.password) {
            toast.error("Please fill password")
            return
        }
        if (!formData.mobileNumber) {
            toast.error("Please fill mobileNumber")
            return
        }
        if (!formData.firstName) {
            toast.error("Please fill firstName")
            return
        }
        if (!formData.lastName) {
            toast.error("Please fill lastName")
            return
        }
        if (!formData.country) {
            toast.error("Please select country")
            return
        }

        try {
            const response = await makeApi("/api/register-user", "post", formData)

            const responseData = response.data
            if (responseData.success) {
               
                toast.success(responseData.message || "Sign up Successfully", {
                    onClose: () => {
                        navigate("/auth/login")
                    },
                })
            } else {
                console.log("Signup failed:", responseData.error)
            }
        } catch (error) {
            // console.log("Error during signup:", error)
            // toast.error(error.response.data.message)
            console.log("Error during signup:", error)
            const errorMessage =
                error.response?.data?.message || "An error occurred during signup."
            toast.error(errorMessage)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="signup">
                <div className="signup-form">
                    <div className="enter-name">
                        <input
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            onChange={changeHandler}
                            value={formData.firstName}
                        />

                        <input
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={changeHandler}
                        />

                    </div>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={changeHandler}
                    />
                    <input
                        name="mobileNumber"
                        type="number"
                        placeholder="Phone Number"
                        value={formData.mobileNumber}
                        onChange={changeHandler}
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={changeHandler}
                    />
                        {/* <label htmlFor="country"> Select a country </label> */}
                    <select className="p-3" name="country" required placeholder="Select a country" value={formData.country} onChange={changeHandler}>
                        <option >Select a country</option>
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => {
                            signup()
                        }}
                    >
                        Continue
                    </button>

                    <p className="loginsignup-login">
                        Already have an account? <span> </span>
                        <Link to="/auth/login" className="css-for-link-tag golden-color-text"  >
                            <span
                                style={{ cursor: "pointer" }}
                            >
                                Login Here
                            </span>
                        </Link>
                    </p>

                </div>
            </div>
        </>
    )
}

export default Signup

// import React, { useState, useMemo } from 'react'
// import Select from 'react-select'
// import countryList from 'react-select-country-list'

// function CountrySelector() {
//   const [value, setValue] = useState('')
//   const options = useMemo(() => countryList().getData(), [])

//   const changeHandler = value => {
//     setValue(value)
//   }

//   return <Select options={options} value={value} onChange={changeHandler}  />
// }

// export default CountrySelector


