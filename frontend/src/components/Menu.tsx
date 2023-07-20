import SearchBar from "./SearchBar";
import UserInfo from "./UserInfo";

export default function Menu(): JSX.Element {
  return (
    <div className='flex justify-between'>
      <div className="mx-5 flex">
        <a href="/"><img src="/asset/logo.jpg" alt="Logo" className="w-28" /></a>
        <div className="px-4 list-none flex items-center uppercase">
          <a href="/" className="p6 font-barlow text-xl hover:text-cyan-400">Trang chủ</a>
          <a href="/product" className="px-6 font-barlow text-xl font-balow hover:text-cyan-400">Sản phẩm</a>
          <a href="/about" className="px-6 font-barlow text-xl font-balow hover:text-cyan-400">Về chúng tôi</a>
          <a href="/news" className="px-6 font-barlow text-xl font-balow hover:text-cyan-400">Tin tức</a>
        </div>
      </div>
      <div className="flex mx-5 items-center">
        <SearchBar />
        <img src="/asset/icon-cart.png" alt="Logo"  className="w-14" />
        <a href="login" className="px-3 py-2 bg-sky-500 rounded-3xl ml-4 hover:text-neutral-50">Đăng nhập</a>
        <a href="register"  className="px-3 py-2 bg-sky-500 rounded-3xl ml-4 hover:text-neutral-50">Đăng ký</a>
        <UserInfo />
      </div>
    </div>
  )
}
