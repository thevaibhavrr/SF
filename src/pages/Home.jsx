import Scroll from "../components/scroll/smoothscroll.js"
import React, { lazy, Suspense } from 'react'
import Primaryloader from '../components/loaders/primaryloader'
const HomeBanner = lazy(() => import("../components/Home/banner/banner"))
const Knowmore = lazy(() => import("../components/Home/Knowmore"))
const MainOurStory = lazy(() => import("../components/Home/ourStory/MainOurStory"))
const MainAllproductImages = lazy(() => import("../components/Home/ourProductImages/mainAllproductImages"))
const Uptodate = lazy(() => import("../components/Home/uptoDate/uptodate"))
const Ourcollection = lazy(() => import("../components/Home/ourCollection/Ourcollection"))
const BesatSaller = lazy(() => import("../components/Home/BestSaller/besatSaller"))
const Voice = lazy(() => import("../components/Home/Voices/Voice"))
function Home() {
  return (
    <div>

      <Suspense fallback={<div> <Primaryloader /> </div>}>
      <Scroll/>

        <HomeBanner />
        <Knowmore />
        <Ourcollection />
        <MainOurStory />
        <BesatSaller />
        <MainAllproductImages />
        <Voice />
        <Uptodate />
      </Suspense>
    </div>
  )
}

export default Home