import { useState } from "react";
import "@fontsource/barlow";

import Footer from "../components/Footer";
import HeaderPhone from "../components/HeaderContact";
import Menu from "../components/Menu";
import HideOnScroll from "../utils/HideOnScroll";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send the input data to the server using an API request
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle the server response as needed
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <HideOnScroll>
        <HeaderPhone />
      </HideOnScroll>

      <Menu />

      <div className="my-24 mx-auto border-2 w-1/4">
        <h1 className="font-barlow text-5xl text-center">Đăng Nhập</h1>
        <form className="flex flex-col my-10">
          <input type="text" placeholder="Email" className="h-10 w-7/12 my-1 mx-auto p-2 border-2 font-barlow"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input type="text" placeholder="Mật khẩu" className="h-10 w-7/12 my-1 mx-auto p-2 border-2 font-barlow"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input type="submit" value="Đăng Nhập" className="w-4/12 my-3 mx-auto p-3 bg-black text-white hover:cursor-pointer" />
          <a href="/" className="w-5/12 my-3 mx-auto text-center">Quay lại trang chủ</a>
          <a href="/register" className="w-5/12 my-3 mx-auto text-center">Chưa có tài khoản? Đăng ký tại đây</a>
        </form>
      </div>
      
      <Footer />
    </div>
  )
}