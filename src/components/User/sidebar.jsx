import React, { useEffect, useState } from "react"
// import "./CSS/userProfile.css"
import "../../styles/User/usersidebar.css"
// import { assets } from "../assets/assets"
import { Outlet, useNavigate } from "react-router-dom"
import { makeApi } from "../../api/callApi.tsx"

const UserProfileSidebar = () => {
	const navigate = useNavigate()
	const [extended, setExtended] = useState(window.innerWidth > 800)
	const [userDatails, setUserDetails] = useState()

	const handleResize = () => {
		setExtended(window.innerWidth > 800)
	}

	useEffect(() => {
		fetchUserDetail()
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const fetchUserDetail = async () => {
		try {
			const responce = await makeApi("/api/my-profile", "GET")
			setUserDetails(responce.data.user)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="userProfile">
			<hr className="userprofile-hr" />
			<div className="user-sidebar-info">
				<div className="userProfile-sidebar">
					<div className="userprofile-h1">
						<img
							// src={assets.userprofile_menu}
							alt="re"
							className="userprofiele-menu"
							onClick={() => setExtended((prev) => !prev)}
						/>
						<h1>PROFILE</h1>
					</div>
					<div
						className="userprofile-name user-flexcol"
						onClick={() => navigate("/userprofile")}
					>
						<img
							className="myuser-profile-icon"
							// src={assets.userprofile_icon}
							src={userDatails?.userImage}
							alt=""
						/>
						{extended ? (
							<div className="user-name">
								<span>HELLO</span>

								<p>{`${userDatails?.firstName} ${userDatails?.lastName}`}</p>
							</div>
						) : null}
					</div>
					<div
						className="user-account user-flexcol"
						onClick={() => navigate("/user/userprofile")}
					>
						<img
							// src={assets.user_account}
							alt="user_account"
						/>
						{extended ? <p>MY ACCOUNT</p> : null}
					</div>
					<div
						className="user-orders user-flexcol"
						onClick={() => navigate("/user/my-orders")}
					>
						<img
							// src={assets.user_orders}
							alt="user-orders"
						/>
						{extended ? <p>MY ORDERS</p> : null}
					</div>
					<div
						className="user-address user-flexcol"
						onClick={() => navigate("/user/my-address")}
					>
						<img
							// src={assets.user_address}
							alt="user_address"
						/>
						{extended ? <p>MY ADDRESS</p> : null}
					</div>
					<div
						className="user-watchlist user-flexcol"
						onClick={() => navigate("/user/my-wishlist")}
					>
						<img
							// src={assets.user_watchlist}
							alt="user_watchlist"
						/>
						{extended ? <p>WISHLIST</p> : null}
					</div>
				</div>
				<div className="userProfile-info">
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default UserProfileSidebar
