import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { lazy ,  Suspense  } from "react";
import Primaryloader from "./components/loaders/primaryloader";
import NewHome from "./pages/NewHome";
import ProductCard from "./components/NewHome/Newhomeproduct/Newhomeproduct";
import OurProduct from "./components/NewHome/TEST/TEst";
import Carousel from "./components/NewHome/TEST/TEst";
import DryFuitelist from "./components/NewHome/DryFuite/DryFuitelist";



const MainHeader = lazy(() => import("./components/Header/MainHeader"));
const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/auth"));
const User = lazy(() => import("./pages/User"));
const Information = lazy(() => import("./pages/information"));
const Footer = lazy(() => import("./components/Footer/footer"));
const Product = lazy(() => import("./pages/product"));
const AboutUs = lazy(() => import("./pages/aboutUs"));
const ContectUs = lazy(() => import("./pages/contect"));
const Order = lazy(() => import("./pages/order"));
const ForgotPasswordForm = lazy(() => import("./components/Auth/sendMail"));
const OtpVerifiedForm = lazy(() => import("./components/Auth/otp"));


function App() {
  return (
    <div  >
      {!useLocation().pathname.includes("/user-password") && <MainHeader />}

      <Suspense fallback={<div> <Primaryloader/> </div>}>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/pp" element={<DryFuitelist />} /> */}
        

        <Route path="/" element={<NewHome />} />
        {/* about */}
        <Route path="/about-us" element={<AboutUs />} />
        {/* contact */}
        <Route path="/contact-us" element={<ContectUs />} />
        {/* auth */}
        <Route path="/auth/*" element={<Auth />} />
        {/* user */}
        <Route path="/user/*" element={<User />} />
        {/* information */}
        <Route path="/information/*" element={<Information />} />
        {/* product */}
        <Route path="/product/*" element={<Product />} />
        {/* order */}
        <Route path="/order/*" element={<Order />} />
        {/* auth */}
        <Route
          path="/user-password/Forgot-Password"
          element={<ForgotPasswordForm />}
        />
        <Route
          path="/user-password/otp-verified"
          element={<OtpVerifiedForm />}
        />
        {/*  unknown page */}
        <Route path="*" element={<Home />} />
      </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
