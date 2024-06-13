import React from 'react'
import LineLeft from "../../../assets/img/NewHome/LineLeft.png"
import LineRight from "../../../assets/img/NewHome/LineRight.png"
import "../../../styles/NewHome/SeondrayHeading.css"


function SeondrayHeading({HeadingText}) {
    return (
        <div className='d-flex  justify-content-center align-items-center gap-1 px-4' >
            <div className=' secondryHeadingLine_image_div text-end' >

                <img src={LineLeft} alt="" className='secondryHeadingLine_image' />
            </div>
            <div className='Insanibufontfamily  text-center' >{HeadingText}   </div>
            <div className=' secondryHeadingLine_image_div' >

                <img src={LineRight} alt="" className='secondryHeadingLine_image' />
            </div>

        </div>
    )
}

export default SeondrayHeading