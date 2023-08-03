import { BrowserRouter, Route, Routes } from "react-router-dom";

import Admin from "./pages/Admin";
import Home from "./pages/Home";
//import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import About from "./pages/About";
import LoginRegister from "./pages/LoginRegister";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/about" element={<About />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/*"
          element={<h1 className="text-center">Not Found The Page</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
