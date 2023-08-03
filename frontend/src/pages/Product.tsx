import Menu from "../components/Menu"
import HideOnScroll from "../utils/HideOnScroll"
import Footer from "../components/Footer"
import HeaderContact from "../components/HeaderContact"
import ProductShowcase from "../components/ProductShowcase"
import { useState } from "react"

export default function Product(): JSX.Element {
  const [productdetail, setProductdetail] = useState<any>(null)
  const [search, setSearch] = useState<string>("")

  const handleSearch = (searchValue: string) => {
    setSearch(searchValue)
  }

  return (
    <div>
      <HideOnScroll>
        <HeaderContact />
      </HideOnScroll>

      <Menu />

      {productdetail === null ?
        <ProductShowcase />
        :
        <div></div>
      }

      <Footer />
    </div>
  );
}
