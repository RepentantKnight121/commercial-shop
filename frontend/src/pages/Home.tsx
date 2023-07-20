import Menu from "../components/Menu"
import HideOnScroll from "../utils/HideOnScroll"
import Footer from "../components/Footer"
import HeaderContact from "../components/HeaderContact"

function Home(): JSX.Element {
  return (
    <div>
      <HideOnScroll>
        <HeaderContact />
      </HideOnScroll>

      <Menu />

      <div>Home Page</div>
      
      <Footer />
    </div>
  );
}

export default Home;
