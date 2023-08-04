import Menu from "../components/Menu";
import Footer from "../components/Footer";

function About(): JSX.Element {
  return (
    <div className="font-barlow">
      <Menu />

      {/* main content */}
      <div className="w-4/5 mx-auto mt-2 bg-black">Đang suy nghĩ</div>

      <Footer />
    </div>
  );
}

export default About;
