import Menu from "../components/Menu"
import HeaderPhone from "../components/HeaderContact"
import HideOnScroll from "../utils/HideOnScroll";
import Footer from "../components/Footer";

function Home(): JSX.Element {
  return (
    <div>
      <HideOnScroll>
        <HeaderPhone />
      </HideOnScroll>

      <Menu />

      <div>Home Page</div>
      
      <Footer />
    </div>
  );
}

export default Home;
