import React, { useState } from "react";
import "../../../styles/Home/uptoDate/uptodate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify
import { makeApi } from '../../../api/callApi.tsx';
import SeondrayHeading from "../SeondrayHeading/SeondrayHeading.jsx";

function StayUpToDate() {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Please fill in your email");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const response = await makeApi("/api/create-subscribe", "POST", { email });
      if (response.data.success === true) {
        toast.success(response.data.message, {
          onClose: () => {
            setEmail("");
          },
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error sending data:", error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className='uptodate_main_div mt-4'>
        {/* <div className='Main_Home_heading'>Stay up-to-date</div> */}
        <SeondrayHeading HeadingText="STAY UP-TO-DATE" />

        <div className='uptodate_sub_div'>
          <div className='uptodate_input_div'>
            <input
              type='email'
              placeholder='Email Address'
              className='uptodate_input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='uptodate_Subscribe_buttons' onClick={handleSubmit}>
            Subscribe
          </div>
        </div>
      </div>
    </>
  );
}

export default StayUpToDate;
