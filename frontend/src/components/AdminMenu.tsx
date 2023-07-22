import { faAddressBook, faArrowRight, faBox, faBoxesStacked, faImage, faMoneyBill, faMoneyBillTransfer, faMoneyBills, faTag, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Handle = {
  limit: number
  setDisplay: (display: string) => void
  setLimit: (limit: number) => void
}

export default function AdminMenu(props: Handle): JSX.Element {
  const [choose, setChoose] = useState<string>("")
  const [limit, setLimit] = useState<number>(props.limit)

  const handleButtonClick = (display: string) => {
    props.setDisplay(display);
    setChoose(display)
  }

  const handleLimit = (limit: number) => {
    setLimit(limit)
    props.setLimit(limit)
  }

  return (
    <div className="p-10 w-2/12 bg-sky-600 flex flex-col">
      <h1 className="p-4 text-center text-3xl text-white">Quản lý thông tin</h1>
      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="account" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("account")}><FontAwesomeIcon icon={faUser} className="px-1" /> Tài khoản {choose==="account" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="account-role" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("account-role")}><FontAwesomeIcon icon={faAddressBook} className="px-1" /> Loại tài khoản {choose==="account-role" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="customer" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("customer")}><FontAwesomeIcon icon={faUserGroup} className="px-1" /> Khách hàng {choose==="customer" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="bill-info" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("bill-info")}><FontAwesomeIcon icon={faMoneyBill} className="px-1" /> Hóa đơn {choose==="bill-info" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="bill-detail" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("bill-detail")}><FontAwesomeIcon icon={faMoneyBills} className="px-1" /> Hóa đơn chi tiết {choose==="bill-detail" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="bill-status" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("bill-status")}><FontAwesomeIcon icon={faMoneyBillTransfer} className="px-1" /> Trạng thái hóa đơn {choose==="bill-status" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="discount" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("discount")}><FontAwesomeIcon icon={faTag} className="px-1" /> Giảm giá {choose==="discount" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="category" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("category")}><FontAwesomeIcon icon={faBoxesStacked} className="px-1" /> Loại sản phẩm {choose==="category" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="product" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("product")}><FontAwesomeIcon icon={faBox} className="px-1" />Sản phẩm {choose==="product" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="product-image" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("product-image")}><FontAwesomeIcon icon={faImage} className="px-1" /> Ảnh sản phẩm {choose==="product-image" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>
    
      <p className="pl-6 pr-6 pt-4 pb-4 text-center text-white flex flex-col">Giới hạn giá trị xem:
        <input className="mx-auto my-2 w-28 text-center text-black" type="number" value={limit} 
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (parseInt(event.target.value) <= 5) {
              handleLimit(5)
              event.target.value = "5"
            } else if (parseInt(event.target.value) >= 50) {
              handleLimit(50)
              event.target.value = "50"
            } else {
              handleLimit(parseInt(event.target.value))
            }
          }}></input></p>
    </div>
  )
}
