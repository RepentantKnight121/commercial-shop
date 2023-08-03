import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import "@fontsource/barlow";

import Footer from "../components/Footer";
import Menu from "../components/Menu";

export default function Register(): JSX.Element {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await axios
      .post("http://localhost:4505/api/account", {
        username: username,
        roleID: 1,
        password: password,
        displayname: displayname,
        Email: email,
        Active: 1,
      })

      .then(function (response: AxiosResponse) {
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {/* <HideOnScroll>
        <HeaderPhone />
      </HideOnScroll> */}

      <Menu />

      <div className="my-24 py-10 mx-auto border-2 w-1/4">
        <h1 className="font-barlow text-5xl text-center">Đăng ký</h1>
        <form className="flex flex-col my-10" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tài khoản"
            className="h-10 w-7/12 my-1 mx-auto p-2 border-2 font-barlow"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="Mật khẩu"
            className="h-10 w-7/12 my-1 mx-auto p-2 border-2 font-barlow"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <input
            type="text"
            placeholder="Tên hiển thị"
            className="h-10 w-7/12 my-1 mx-auto p-2 border-2 font-barlow"
            value={displayname}
            onChange={(event) => setDisplayname(event.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="h-10 w-7/12 my-1 mx-auto p-2 border-2 font-barlow"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="submit"
            value="Đăng Ký"
            className="w-4/12 my-3 mx-auto p-3 bg-sky-500 text-white hover:cursor-pointer"
          />
          <a
            href="/"
            className="w-5/12 my-3 mx-auto text-center hover:text-sky-500 hover:underline">
            Quay lại trang chủ
          </a>
        </form>
      </div>

      <Footer />
    </div>
  );
}
