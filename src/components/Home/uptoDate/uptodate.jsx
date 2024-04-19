import React from 'react'
import "../../../styles/Home/uptoDate/uptodate.css"
function Uptodate() {
  return (
    <div className='uptodate_main_div' >
        <div className='Main_Home_heading'>Stay up-to-date</div>
        <div className='uptodate_sub_div' >
            <div className='uptodate_input_div' >
                <input type='text' placeholder='Email Address' className='uptodate_input' />
            </div>
            <div className='uptodate_Subscribe_buttons' >
                Subscribe
            </div>
        </div>
    </div>
  )
}

export default Uptodate