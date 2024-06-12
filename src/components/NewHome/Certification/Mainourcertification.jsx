import React from 'react'
import SeondrayHeading from '../SeondrayHeading/SeondrayHeading'
import HACCP from "../../../assets/img/NewHome/HACCP.svg"
import FASSAI from "../../../assets/img/NewHome/FASSAI.svg"
import BRC from "../../../assets/img/NewHome/BRC.svg"
import BSI from "../../../assets/img/NewHome/BSI.svg"
import FDA from "../../../assets/img/NewHome/FDA.svg"

function Mainourcertification() {
    const images = [FDA,BSI, BRC,FASSAI,HACCP,  ]
  return (
    <div className='mt-5 py-5' >
        <div>
        <SeondrayHeading HeadingText="CRAFTING FOOD" />
        </div>
        <div className='mx-5' >
            <div className='d-flex justify-content-between align-items-around gap-5 mx-5' >
                {images.map((image, index) => (
                    <img key={index} src={image} alt="Crafting Food" width="130px" className='img-fluid' />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Mainourcertification