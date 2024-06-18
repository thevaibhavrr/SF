import React from 'react'
import SeondrayHeading from '../SeondrayHeading/SeondrayHeading'
import HACCP from "../../../assets/img/NewHome/HACCP.svg"
import FASSAI from "../../../assets/img/NewHome/FASSAI.svg"
import BRC from "../../../assets/img/NewHome/BRC.svg"
import BSI from "../../../assets/img/NewHome/BSI.svg"
import FDA from "../../../assets/img/NewHome/FDA.svg"

import "../../../styles/NewHome/Certification.css"
function Mainourcertification() {
    const images = [FDA,BSI, BRC,FASSAI,HACCP,  ]
  return (
    <div className='mt-5 py-5' >
        <div>
        <SeondrayHeading HeadingText="OUR CERTIFICATION" />
        </div>
        <div className='' >
            <div className=' our_certification_div ' >
                {images.map((image, index) => (
                    <img key={index} src={image} alt="Crafting Food" className='img-fluid our_certification_images ' />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Mainourcertification