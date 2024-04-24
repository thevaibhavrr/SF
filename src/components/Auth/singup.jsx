import React, { useEffect, useState } from "react"
import { makeApi } from "../../api/callApi.tsx"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Auth/singup.css"


const Signup = () => {
    const navigate = useNavigate()



    const data = [
        {
            message: "Hello World! 11:13:16  sec ",
            time: 1713937335,
        },
        // {
        //     message: "Hello World! 2  10:55:50 ",
        //     time: 1713936350,
        // },
        // {
        //     message: "Hello World! 3 10:56:15 ",
        //     time: 1713936375,
        // },
    ];

    // function scheduleMessages() {
    //     data.forEach(({ message, time }) => {
    //         const delay = time * 1000 - Date.now();
    //         if (delay > 0) {
    //             setTimeout(() => {
    //                 console.log(message);

    //                 const signuptesting = async () => {
    //                     try {
    //                         const response = await makeApi("/api/register-user", "post", {
    //                             firstName: "test",
    //                             lastName: "test",
    //                             password: "211",
    //                             email: "ewewewee@gmail.com",
    //                             mobileNumber: "10000010100",
    //                         })

    //                         const responseData = response.data
    //                         if (responseData.success) {
    //                             localStorage.setItem("token", responseData.token)
    //                             toast.success(responseData.message || "Sign up Successfully", {
    //                                 onClose: () => {
    //                                     navigate("/")
    //                                 },
    //                             })
    //                         } else {
    //                             console.log("Signup failed:", responseData.error)
    //                         }
    //                     } catch (error) {
    //                         console.log("Error during signup:", error)
    //                         const errorMessage =
    //                             error.response?.data?.message || "An error occurred during signup."
    //                         toast.error(errorMessage)
    //                     }
    //                 }

    //                 signuptesting()




    //             }, delay);
    //         }
    //     });
    // }

    // scheduleMessages();





    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        mobileNumber: "",
    })
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


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

        try {
            const response = await makeApi("/api/register-user", "post", formData)

            const responseData = response.data
            if (responseData.success) {
                localStorage.setItem("token", responseData.token)
                toast.success(responseData.message || "Sign up Successfully", {
                    onClose: () => {
                        navigate("/")
                    },
                })
            } else {
                console.log("Signup failed:", responseData.error)
                // Handle signup failure
            }
        } catch (error) {
            // console.log("Error during signup:", error)
            // toast.error(error.response.data.message)

            // Handle error
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
