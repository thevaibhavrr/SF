import React from 'react'
import "../../styles/footer/footer.css"
import Logo from "../../Images/Header/SK Foods Logo 3.png"
import Facebook from "../../Images/Footer/Facebook Circled.png"
import Instagram from "../../Images/Footer/Instagram.png"
import { Link } from 'react-router-dom'

import Lastfooter from './lastfooter'
function Footer() {
    return (
        <>
            <div className='footer_main_div' >
                {/* main logo */}
                <div className='footer_quick_links'>
                    <div className='footer_icon_image_div' >
                        <img loading="lazy" src={Logo} alt="Logo" className='Main_SK_logo' />
                    </div>
                </div>
                {/* media links */}
                <div className='footer_quick_links' >
                    <div className='footer_quick_links_heading' >Media Links</div>
                    <div className='media_links_div' >
                        <div><img loading="lazy" src={Instagram} alt="Instagram" className='media_links' /></div>
                        <div><img loading="lazy" src={Facebook} alt="Facebook" className='media_links' /></div>
                    </div>
                </div>
                {/* Quick Links */}
                <div className='footer_quick_links ' >
                    <div className='footer_quick_links_heading' >Quick Links</div>
                    <div className='footer_quick_links_data' >
                        <Link to="/" className='css-for-link-tag footer_text_golden_color' >
                            <div>HOME</div>
                        </Link>
                        <Link to="/product/all-products" className='css-for-link-tag footer_text_golden_color' >
                            <div>PRODUCTS</div>
                        </Link>
                        <Link to="/about-us" className='css-for-link-tag footer_text_golden_color' >
                            <div>ABOUT US</div>
                        </Link>
                        <Link to="/contact-us" className='css-for-link-tag footer_text_golden_color' >
                            <div>CONTACT US</div>
                        </Link>
                    </div>
                </div>
                {/* Contact Us */}
                <div className='footer_quick_links Contact_us_div_footer' >
                    <div className='footer_quick_links_heading contact_us_heading ' >Contact Us</div>
                    <div className='footer_quick_links_data' >
                        <Link to={"/"} >
                        <div>HOME</div>
                        </Link>
                        <a href="tel:+91123456789" className='css-for-link-tag footer_text_golden_color'>
                            <div>+91 123456789</div>
                        </a>

                        <a href="mailto:xyz@skfoods.com" className='css-for-link-tag footer_text_golden_color'>
                            <div>xyz@skfoods.com</div>
                        </a>
                    </div>
                </div>

            </div>

            {/* last footer */}
            <Lastfooter />
        </>
    )
}

export default Footer