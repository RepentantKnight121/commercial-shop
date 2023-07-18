import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import ButtonHidden from "./ButtonHidden";

export default function Menu(): JSX.Element {
  return (

 <div className='flex justify-between'> 
      <div className="flex">
            <a href="">
                  <img src="/asset/logo.jpg" alt="Logo" className="w-28" />
            </a>
            <ul className='list-none flex ml-20 items-center uppercase'>
                  <li className="px-5 hover:text-cyan-400">Trang chủ</li>
                  <li className="px-5 hover:text-cyan-400">Sản phẩm</li>
                           <li className="px-5 hover:text-cyan-400">Thông tin của chúng tôi</li>
                  <li className="px-5 hover:text-cyan-400">Tin tức</li>
            </ul>
      </div>
      <div className="flex mr-5 items-center">
            <SearchBar />  
            <a href="">
                  <img src="/asset/icon-cart.png" alt="Logo"  className="w-14" />
            </a>  
            <a href={"login"}  className="px-3 py-2 bg-blue-light rounded-3xl ml-4 hover:text-neutral-50">Đăng nhập</a>
            <a href={"register"}  className="px-3 py-2 bg-blue-light rounded-3xl ml-4 hover:text-neutral-50">Đăng ký</a>
            <ButtonHidden />
      </div>           
</div>

  )
}
