
import React, { useEffect, useState } from "react"
import "../../styles/User/profile.css"
import { useNavigate } from "react-router"
import UserProfileSidebar from "./sidebar"
import { makeApi } from "../../api/callApi.tsx"

const MyAccount = () => {
    const navigate = useNavigate()
    const [userDatails, setUserDetails] = useState()

    const fetchUserDetail = async () => {
        try {
            const responce = await makeApi("/api/my-profile", "GET")
            setUserDetails(responce.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserDetail()
    }, [])


    return (
        <div className="d-flex">
        <div className="" >
            <UserProfileSidebar/>
        </div>
        <div className="myaccount w-100">
            <div className="userprofile-heading">
                <h1>PERSONAL INFORMATION</h1>
            </div>
            {/* {userDatails && ( */}
                <div className="myaccount-info userprofile-info-css">
                    <div className="left-myaccount-info">
                        <img
                            src={userDatails?.userImage}
                            // src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt=""
                        />
                        <div className="userprofilename">
                            <span>NAME</span>
                            {/* <p>{userDatails.firstName + " " + userDatails.lastName}</p> */}
                            <p>{userDatails?.firstName} {userDatails?.lastName}</p>
                        </div>
                        {/* <div className="userprofile-birthdate">
                            <span>DATE OF BIRTH</span>
                            <p> 01/01/2000 </p>
                        </div> */}
                        {/* <div className="userprofile-gender">
                            <span>GENDER</span>
                            <p>Male</p>
                        </div> */}
                        <div className="userprofile-no">
                            <span>CONTACT NUMBER</span>
                            {/* <p>{userDatails.mobileNumber}</p> */}
                            <p>{userDatails?.mobileNumber}</p>
                        </div>
                        <div className="userprofile-email">
                            <span>EMAIL ADDRESS</span>
                            {/* <p>{userDatails.email}</p> */}
                            <p>{userDatails?.email}</p>
                        </div>
                    </div>
                    <div className="right-myaccount-info">
                        {/* <div
                            className="change-profileinfo"
                            onClick={() => navigate("/edit-userprofile")}
                        >
                            <img
                                // src={assets.profile_reset}
                                src="https://img.icons8.com/external-vitaliy-gorbunov-lineal-color-vitaly-gorbunov/60/000000/external-settings-user-interface-vitaliy-gorbunov-lineal-color-vitaly-gorbunov-3.png"
                                alt="image"
                            />
                            <p>change profile information</p>
                        </div>{" "} */}
                        {/* <div
                            className="change-profilepwd"
                            onClick={() => navigate("/edit-userprofile")}
                        >
                            <img
                                // src={assets.password_reset}
                                src="https://img.icons8.com/external-vitaliy-gorbunov-flat-vitaly-gorbunov/60/000000/external-key-security-vitaliy-gorbunov-flat-vitaly-gorbunov.png"
                                alt="password"
                            />
                            <p>change password</p>
                        </div> */}
                    </div>
                </div>
            {/* )} */}
        </div>

        </div>
    )
}

export default MyAccount
