import Footer from "../components/Footer";
import Menu from "../components/Menu";

export default function Payment(): JSX.Element {
  return (
    <div className="font-barlow">
      <Menu />

      <div className="mt-4 py-4 w-full bg-grey-light text-coffee text-center text-2xl font-semibold ">
        Thanh toán
      </div>
      <div className="mt-10 mb-1 flex w-4/5 px-14 mx-auto">
        {/* Thông tin nhận hàng */}
        <div className=" w-2/5">
          <p className="text-center font-semibold">THÔNG TIN NHẬN HÀNG</p>
          <p className="mt-6 mb-2">Họ và tên</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <p className="mt-6 mb-2">Gmail</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <p className="mt-6 mb-2">Số điện thoại</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <p className="mt-6 mb-2">Địa chỉ giao hàng</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
        </div>
        {/* Thông tin đơn hàng */}
        <div className=" w-3/5 ml-16">
          <p className="text-center font-semibold">ĐƠN HÀNG</p>
          <div className="w-full mt-6 mb-2 h-px mx-auto bg-neutral-300"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
