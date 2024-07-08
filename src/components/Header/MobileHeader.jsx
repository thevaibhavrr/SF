import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/header/MobileHeader.css";
import mainIcon from "../../Images/Header/SK Foods Logo 3.png"


function SmallNavbar() {
  const [showVerticalNavbar, setShowVerticalNavbar] = useState(false);
  const location = useLocation();
  const [IsLogin, setIsLogin] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
        setIsLogin(true)
    } else {
        setIsLogin(false) 
    }

}, [localStorage.getItem("token")])

  useEffect(() => {
    setShowVerticalNavbar(false);
  }, [location]);

  const toggleVerticalNavbar = () => {
    setShowVerticalNavbar(!showVerticalNavbar);
  };

  const [isFixed, setIsFixed] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* navbar for small screen */}
      <div className={`card_for_small_screen navbar_for_small_screen `}>
        <nav className="navbar navbar-expand-lg px-2">
          <div
            className="d-flex justify-content-around w-100"
            data-aos="zoom-out"
            data-aos-offset="200"
            data-aos-delay="1000"
            data-aos-duration="5000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-anchor-placement="top-center"
          >
            <div className="">
              <Link to={"/"} className="css-for-link-tag">
                <img loading="lazy" src={mainIcon} alt=""  className="header-logo-for-mobile-nav" />
              </Link>
            </div>
            <div className="vertical-navbar-close-open-button" onClick={toggleVerticalNavbar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-filter-right"
                viewBox="0 0 16 16"
              >
                <path d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5" />
              </svg>
            </div>
          </div>

          {/* Vertical Navbar */}
          {showVerticalNavbar && (
            <>
              <div className="vertical-navbar">
                <div>
                <ul
                  className="navbar_ul_for_small_screen"
                  data-aos="zoom-out"
                  data-aos-offset="200"
                  data-aos-delay="100"
                  data-aos-duration="500"
                  data-aos-easing="ease-in-out"
                  data-aos-mirror="true"
                >
                  <Link to={"/"} className="css-for-link-tag">
                    <li>Home</li>
                  </Link>
                  <Link to={"/about-us"} className="css-for-link-tag">
                    <li>About Us</li>
                  </Link>
                  <Link to={"/product/all-products"} className="css-for-link-tag">
                    <li>E-Store</li>
                  </Link>
                 
                  <Link to={"/contact-us"} className="css-for-link-tag">
                    <li>Contact Us</li>
                  </Link>
                </ul>
                </div>
                    {/* login singup */}
                  {!IsLogin &&
                <div className="d-flex  justify-content-evenly" >
                  <Link to={"auth/login"} className="css-for-link-tag css-for-golden-color" >
                  <div className="d-flex gap-1" >
                    <div>Login</div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                        <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                      </svg>
                    </div>
                  </div>
                  </Link>
                  <div>|</div>
                  <Link to={"auth/signup"} className="css-for-link-tag css-for-golden-color" >
                  <div className="d-flex gap-2">
                    <div>SingUp</div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                      </svg>

                    </div>
                  </div>
                  </Link>
                </div>
                  }
              </div>


            </>
          )}
        </nav>
      </div>
    </>
  );
}

export default SmallNavbar;
