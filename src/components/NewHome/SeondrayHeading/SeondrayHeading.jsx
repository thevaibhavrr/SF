import React from 'react'
import LineLeft from "../../../assets/img/NewHome/LineLeft.png"
import LineRight from "../../../assets/img/NewHome/LineRight.png"


function SeondrayHeading({HeadingText}) {
    return (
        <div className='d-flex justify-content-center align-items-center' >
                <img src={LineLeft} alt="" className='w-100' />
            <div className='Insanibufontfamily  text-center' >{HeadingText}   </div>
                <img src={LineRight} alt="" className='w-100' />

        </div>
    )
}

export default SeondrayHeading