type Handle = {
  setDisplay: (display: string) => void
}

export default function AdminMenu(props: Handle): JSX.Element {
  const handleButtonClick = (display: string) => {
    props.setDisplay(display);
  }

  return (
    <div className="bg-sky-200 flex flex-col">
      <h1 className="text-2xl">Quản lý thông tin</h1>
      <button className="p-3" onClick={() => handleButtonClick("account")}>Tài khoản</button>
      <button className="p-3" onClick={() => handleButtonClick("account-role")}>Loại tài khoản</button>
      <button className="p-3" onClick={() => handleButtonClick("customer")}>Khách hàng</button>
      <button className="p-3" onClick={() => handleButtonClick("bill-info")}>Hóa đơn</button>
      <button className="p-3" onClick={() => handleButtonClick("bill-detail")}>Hóa đơn chi tiết</button>
      <button className="p-3" onClick={() => handleButtonClick("bill-status")}>Trạng thái hóa đơn</button>
      <button className="p-3" onClick={() => handleButtonClick("discount")}>Giảm giá</button>
      <button className="p-3" onClick={() => handleButtonClick("category")}>Loại sản phẩm</button>
      <button className="p-3" onClick={() => handleButtonClick("product")}>Sản phẩm</button>
      <button className="p-3" onClick={() => handleButtonClick("product-image")}>Ảnh sản phẩm</button>
    </div>
  )
}
