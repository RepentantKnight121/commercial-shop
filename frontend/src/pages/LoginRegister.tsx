import Menu from "../components/Menu";
import Footer from "../components/Footer";

function LoginRegister(): JSX.Element {
  return (
    <div className="font-barlow">
      <Menu />

      <div className="mt-4 py-4 w-full bg-grey-light text-coffee text-center text-2xl font-semibold ">
        TÀI KHOẢN
      </div>

      {/* Space Login and Register  */}
      <div className="mt-10 flex w-4/5 mx-auto">
        {/* Space Login */}
        <div className=" w-2/5">
          <div className="text-coffee text-xl w-full font-semibold">
            Đăng nhập
          </div>
          <p className="mt-6 mb-2">Tên tài khoản</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <p className="my-2">Mật khẩu</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <br />
          <div className="flex justify-between mt-4">
            <div className="flex">
              <input className="mr-1" type="checkbox" />
              <label>Nhớ mật khẩu</label>
            </div>
            <p className="underline underline-offset-2">Quên mật khẩu ?</p>
          </div>
          <div className="flex justify-center">
            <button className="py-1 w-36 mt-8 bg-grey-light">Đăng nhập</button>
          </div>
        </div>

        <div className=" w-1/5">
          <div className="bg-coffee mx-auto w-px h-full"></div>
        </div>

        {/* Space Register */}
        <div className=" w-2/5">
          <div className="text-coffee text-xl w-full font-semibold">
            Đăng ký
          </div>
          <p className="mt-6 mb-2">Tên tài khoản</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <p className="my-2">Gmail</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <p className="my-2">Mật khẩu</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <p className="my-2">Nhập lại mật khẩu</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <div className="flex justify-center">
            <button className="py-1 w-36 mt-8 bg-grey-light">Đăng ký</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginRegister;
