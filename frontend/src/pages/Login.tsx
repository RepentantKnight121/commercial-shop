import "@fontsource/barlow";

import Footer from "../components/Footer";
import HeaderPhone from "../components/HeaderPhone";
import Menu from "../components/Menu";
import HideOnScroll from "../utils/HideOnScroll";

export default function Login(): JSX.Element {
  return (
    <div>
      <HideOnScroll>
        <HeaderPhone />
      </HideOnScroll>

      <Menu />

      <div className="my-24 mx-auto border-2 w-1/4">
        <h1 className="font-barlow text-5xl text-center">Đăng Nhập</h1>
        <form className="flex flex-col my-10">
          <input type="text" placeholder="Email" className="h-10 w-7/12 my-1 mx-auto p-2 border-2 font-barlow" />
          <input type="text" placeholder="Mật khẩu" className="h-10 w-7/12 my-1 mx-auto p-2 border-2 font-barlow" />
          <button className="w-4/12 my-3 mx-auto p-3 bg-black text-white">Đăng Nhập</button>
          <a href="/" className="w-5/12 my-3 mx-auto text-center">Quay lại trang chủ</a>
          <a href="/register" className="w-5/12 my-3 mx-auto text-center">Chưa có tài khoản? Đăng ký tại đây</a>
        </form>
      </div>
      
      <Footer />
    </div>
  )
}