import React, { useState } from 'react';
import '../../styles/Auth/LoginPopup.css';
import { makeApi } from "../../api/callApi.tsx";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';



const LoginPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please fill email");
      return;
    }
    if (!password) {
      toast.error("Please fill password");
      return;
    }

    try {
      const response = await makeApi("/api/login-user", "POST", {
        password,
        email,
      });
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error sending data:", error.response.data.message);
    }
    onClose();
  };

  return (
    <>
    <ToastContainer/>
    <div className="login-popup">
      <div className="login-popup-content">
        <span className="close" onClick={() => onClose}>&times;</span>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="click_buttons" onClick={(e) => handleLogin(e)}>Login</button>
        <div className='text-center px-4 py-3' >

          <p>
            Don't have an account?{" "}
            <span>
              <Link className="css-for-link-tag golden-color-text" to="/auth/signup">
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
    </>

  );
};

export default LoginPopup;
