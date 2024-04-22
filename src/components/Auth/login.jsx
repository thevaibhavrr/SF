import React, { useState } from "react"
import "../../styles/Auth/login.css"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import { makeApi } from "../../api/callApi.tsx";

const Login = () => { 
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const handleSubmit = async (event) => {
		event.preventDefault() 
		if (!email) {
			// toast.error('Please fill email');
			// return;
		}
		if (!password) {
			// toast.error('Please fill password');
			// return;
		}
		try {
			const response = await makeApi("/api/login-user", "POST", { password, email })
			localStorage.setItem("token", response.data.token)
			navigate("/")
		} catch (error) {
			toast.error(error.response.data.message);
			console.error('Error sending data:', error.response.data.message);

		}
	}

	return (
		<>
			<ToastContainer/>
			<div className="login-signup">
				<form
					action=""
				>
					<div className="login">
						<input
							type="email"
							placeholder="Email Address"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							autoComplete="off"
						/>

						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
						/>
						<div className="text-end w-100 text-danger" >
						<Link className="css-for-link-tag golden-color-text" to={"/Forgot-Password"} >
							Forgot password
						</Link>
							</div>

						<button type="submit" onClick={handleSubmit} >Login</button>
						<p>
							Don't have an account?{" "}
							<span>
								<Link className="css-for-link-tag golden-color-text" to="/auth/signup">Sign Up</Link>
							</span>
						</p>
					</div>
				</form>
			</div>
		</>
	)
}

export default Login
