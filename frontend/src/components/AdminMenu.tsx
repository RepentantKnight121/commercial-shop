import { faAddressBook, faArrowRight, faBox, faBoxesStacked, faImage, faMoneyBill, faMoneyBillTransfer, faMoneyBills, faTag, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Handle = {
  setDisplay: (display: string) => void
}

export default function AdminMenu(props: Handle): JSX.Element {
  const [choose, setChoose] = useState<string>("")

  const handleButtonClick = (display: string) => {
    props.setDisplay(display);
    setChoose(display)
  }

  return (
    <div className="p-10 w-2/12 bg-sky-600 flex flex-col">
      <h1 className="p-4 text-3xl text-white">Quản lý thông tin</h1>
      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="account" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("account")}><FontAwesomeIcon icon={faUser} /> Tài khoản {choose==="account" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="account-role" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("account-role")}><FontAwesomeIcon icon={faAddressBook} /> Loại tài khoản {choose==="account-role" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="customer" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("customer")}><FontAwesomeIcon icon={faUserGroup} /> Khách hàng {choose==="customer" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="bill-info" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("bill-info")}><FontAwesomeIcon icon={faMoneyBill} /> Hóa đơn {choose==="bill-info" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="bill-detail" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("bill-detail")}><FontAwesomeIcon icon={faMoneyBills} /> Hóa đơn chi tiết {choose==="bill-detail" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="bill-status" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("bill-status")}><FontAwesomeIcon icon={faMoneyBillTransfer} /> Trạng thái hóa đơn {choose==="bill-status" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="discount" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("discount")}><FontAwesomeIcon icon={faTag} /> Giảm giá {choose==="discount" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="category" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("category")}><FontAwesomeIcon icon={faBoxesStacked} /> Loại sản phẩm {choose==="category" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="product" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("product")}><FontAwesomeIcon icon={faBox} />Sản phẩm {choose==="product" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>

      <button className={"pl-6 pr-6 pt-4 pb-4 " + (choose==="product-image" ? "bg-white text-sky-400" : "text-white")}
        onClick={() => handleButtonClick("product-image")}><FontAwesomeIcon icon={faImage} /> Ảnh sản phẩm {choose==="product-image" ? <FontAwesomeIcon icon={faArrowRight} /> : <></>}</button>
    </div>
  )
}
