import Scroll from "../components/scroll/smoothscroll.js"
import React, { lazy, Suspense } from 'react'
import Primaryloader from '../components/loaders/primaryloader'
import ExitingOfferMain from "../components/NewHome/ExitingOffer/mainExistingOffer.jsx"
import StayUpToDate from "../components/NewHome/uptoDate/uptodate.jsx"
import NewHomeBottomBanner from "../components/NewHome/BottomBanner/NewHomeBottomBaner.jsx"
import CraftingFoodMain from "../components/NewHome/caftingFood/MainCaftingFood.jsx"
import ProductCard from "../components/NewHome/Newhomeproduct/Newhomeproduct.jsx"
import MainMoretoExplore from "../components/NewHome/MoretoExplore/MainMoretoExplore.jsx"
import Mainourcertification from "../components/NewHome/Certification/Mainourcertification.jsx"
import DryFuitemain from "../components/NewHome/DryFuite/DryFuitemain.jsx"
import NewHomeProducts from "../components/NewHome/Newhomeproduct/Newhomeproduct.jsx"
const HomeBanner = lazy(() => import("../components/NewHome/Newbanner/banner.jsx"))
const Knowmore = lazy(() => import("../components/Home/Knowmore.jsx"))
const SpicesLineUpmain = lazy(() => import("../components/NewHome/SpicesLineUp/SpicesLineUpmain.jsx"))
function NewHome() {
  return (
    <div>

      <Suspense fallback={<div> <Primaryloader /> </div>}>
      <Scroll/>

        <HomeBanner />
        <Knowmore/>
        <SpicesLineUpmain/>
        <ExitingOfferMain/>
        <MainMoretoExplore/>
        <DryFuitemain/>
        <NewHomeProducts/>
        <CraftingFoodMain/>
        <NewHomeBottomBanner/>
        <StayUpToDate/>
        <Mainourcertification/>
        {/* <ProductCard/> */}
      </Suspense>
    </div>
  )
}

export default NewHome