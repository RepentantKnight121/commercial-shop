export default function Menu(): JSX.Element {
  return (
    <nav className="flex">
      <div className="flex justify-start">
        <a href="/">Trang chủ</a>
        <a href="/product">Cửa hàng</a>
      </div>
      <div className="flex justify-end">
        <a href="/login" className="text-rose-500 hover:bg-rose-500 hover:text-white">Đăng Nhập</a>
        <div className="px-2">/</div>
        <a href="/register" className="text-rose-500 hover:bg-rose-500 hover:text-white">Đăng Ký</a>
      </div>
    </nav>
  )
}
