import React , { Suspense , lazy} from 'react'
import Primaryloader from '../components/loaders/primaryloader'
import Scroll from '../components/scroll/smoothscroll'
// import AboutBanner from '../components/aboutUs/aboutBanner'
// import AboutJourney from '../components/aboutUs/aboutJourney' 
// import AboutEndeavor from '../components/aboutUs/aboutEndeavor' 

const AboutBanner = lazy(() => import("../components/aboutUs/aboutBanner"))
const AboutJourney = lazy(() => import("../components/aboutUs/aboutJourney"))
const AboutEndeavor = lazy(() => import("../components/aboutUs/aboutEndeavor"))



function AboutUs() {
  return (
    <div>
      {/* <Scroll/> */}

        <Suspense fallback={<div> <Primaryloader /> </div>}>
        <AboutBanner/>
        <AboutJourney/>
        <AboutEndeavor/>
        </Suspense>
    </div>
  )
}

export default AboutUs