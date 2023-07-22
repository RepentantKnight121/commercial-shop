import axios, { AxiosResponse } from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router';
import "@fontsource/barlow";

import Footer from "../components/Footer";
import HeaderPhone from "../components/HeaderContact";
import Menu from "../components/Menu";
import HideOnScroll from "../utils/HideOnScroll";

export default function Login(): JSX.Element {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios.post("http://localhost:4505/api/account/login", {
      username: username,
      password: password
    })
    .then(function (response: AxiosResponse) {
      navigate("/admin")
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  return (
    <div>
      <HideOnScroll>
        <HeaderPhone />
      </HideOnScroll>

      <Menu />

      <div className="my-24 py-10 mx-auto border-2 w-1/4">
        <h1 className="font-barlow text-5xl text-center">Đăng Nhập</h1>
        <form className="flex flex-col my-10" onSubmit={handleSubmit}>
          <input type="text" placeholder="Tài khoản" className="h-10 w-7/12 my-1 mx-auto p-2 border-2 font-barlow"
            value={username}
            onChange={(event) => setUsername(event.target.value)} />
          <input type="text" placeholder="Mật khẩu" className="h-10 w-7/12 my-1 mx-auto p-2 border-2 font-barlow"
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
          <input type="submit" value="Đăng Nhập" className="w-4/12 my-3 mx-auto p-3 bg-sky-500 text-white hover:cursor-pointer" />
          <a href="/" className="w-5/12 my-3 mx-auto text-center hover:text-sky-500 hover:underline">Quay lại trang chủ</a>
          <a href="/register" className="w-5/12 my-3 mx-auto text-center hover:text-sky-500 hover:underline">Chưa có tài khoản? Đăng ký tại đây</a>
        </form>
      </div>

      <Footer />
    </div>
  )
}