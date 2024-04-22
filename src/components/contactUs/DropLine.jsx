import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import "../../styles/contactUs/DropLine.css"
function DropLine() {

    const [Data, setData] = useState({
        "firstname": "",
        "lastname": "",
        "email": "",
        "message": "",
        "phonennumber": ""
    })

    const handelChange = (event) => {
        const { name, value } = event.target
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!Data.firstname) {
            toast.error('Please fill firstname');
            return;
        }
        if (!Data.lastname) {
            toast.error('Please fill lastname');
            return;
        }
        if (!Data.email) {
            toast.error('Please fill email');
            return;
        }
        if (!Data.phonennumber) {
            toast.error('Please fill phonennumber');
            return;
        }
        if (!Data.message) {
            toast.error('Please fill message');
            return;
        }
        if (Data.phonennumber && Data.phonennumber.length < 10) {
            toast.error('Please enter valid phonennumber');
            return;
        }
        try {
            // const response = await makeApi("/api/create-message", "POST", Data)
            // console.log(response)
            // toast.success(response.data.message,{
            // 	onClose: () => {
            // 		setData({
            // 			"firstname": "",
            // 			"lastname": "",
            // 			"email": "",
            // 			"message": "",
            // 			"phonennumber": ""
            // 		})
            // 	}
            // })
            toast.info("Thank you for sharing your thoughts with us")

        } catch (error) {
            toast.error(error);
            console.error('Error sending data:', error.response.data.message);
        }
    }


    return ( 
        <>
            <div className="drop_line_main_div" >
                <div className="Main_Home_heading" >Drop Us a Line</div>
                <div>
                    <div className="contact-form">
                        <div className="fill-form">
                            <form action="">
                                <div className="enter-name">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        onChange={handelChange}
                                        name="firstname"
                                        value={Data.firstname}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={handelChange}
                                        name="lastname"
                                        value={Data.lastname}
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handelChange}
                                    name="phonennumber"
                                    value={Data.phonennumber}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    onChange={handelChange}
                                    name="email"
                                    value={Data.email}
                                />
                                <textarea
                                    cols="30"
                                    rows="4"
                                    placeholder="Message"
                                    onChange={handelChange}
                                    name="message"
                                    value={Data.message}
                                ></textarea>
                                <div className="contact-from-button" >
                                <button onClick={(e) => handleSubmit(e)} className="click_buttons" >Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DropLine