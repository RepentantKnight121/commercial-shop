import { BrowserRouter, Route, Routes } from "react-router-dom";

import Admin from "./pages/Admin"
import AccountInfo from "./pages/AccountInfo"
import Cart from "./pages/Cart"
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import LoginRegister from "./pages/LoginRegister";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";


function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/account-info" element={<AccountInfo />} />
        <Route path="/login-register" element={<LoginRegister />} />
        <Route path="/about" element={<About />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
