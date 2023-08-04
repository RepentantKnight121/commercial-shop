import Menu from "../components/Menu";
import Footer from "../components/Footer";

function Cart(): JSX.Element {
  return (
    <div className="font-barlow">
      <Menu />

      <div className="mt-4 py-4 w-full bg-grey-light text-coffee text-center text-2xl font-semibold ">
        GIỎ HÀNG
      </div>
      <div className="mt-10 mb-1 flex w-4/5 px-14 mx-auto">
        <p className="w-3/5">Sản phẩm</p>
        <div className="flex justify-between w-2/5 ">
          <p>Số lượng</p>
          <p>Tạm tính</p>
          <p>Xóa</p>
        </div>
      </div>
      <div className="w-4/5 h-px mx-auto bg-neutral-300"></div>

      <Footer />
    </div>
  );
}

export default Cart;
