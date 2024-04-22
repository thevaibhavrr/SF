import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainHeader from "./components/Header/MainHeader";
import Home from "./pages/Home";
import Auth from "./pages/auth";
import User from "./pages/User";
import Information from "./pages/information";
import Footer from "./components/Footer/footer";
import Product from "./pages/product";
import AboutUs from "./pages/aboutUs";
import ContectUs from "./pages/contect";
import Order from "./pages/order";

function App() {
  return (
    <div>
      <MainHeader />
      <Routes>
      <Route path="/" element={<Home />} />
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
</Routes>
    <Footer/>
    </div>
  );
}

export default App;
