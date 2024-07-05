import React, { Suspense , lazy} from 'react'
import Primaryloader from '../components/loaders/primaryloader'
import Scroll from '../components/scroll/smoothscroll'
// import ContactUsBanner from '../components/contactUs/contactusbanner'
// import DropLine from '../components/contactUs/DropLine'
// import Mylocation from '../components/contactUs/mylocation'


const ContactUsBanner = lazy(() => import("../components/contactUs/contactusbanner"))
const DropLine = lazy(() => import("../components/contactUs/DropLine"))
const Mylocation = lazy(() => import("../components/contactUs/mylocation"))


function ContectUs() {
  return (
    <div>
      {/* <Scroll/> */}

        <Suspense fallback={<div> <Primaryloader /> </div>}>
        <ContactUsBanner/>
        <DropLine/>
        {/* <Mylocation/> */}
        </Suspense>
    </div>
  )
}

export default ContectUs