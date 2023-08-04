import Menu from "../components/Menu";
import Footer from "../components/Footer";

function NotFound(): JSX.Element {
  return (
    <div>
      <Menu />

      <h1 className="text-center text-3xl">Không tìm thấy trang</h1>
      <p className="text-center">Vui lòng thử lại trang khác</p>

      <Footer />
    </div>
  );
}

export default NotFound;
