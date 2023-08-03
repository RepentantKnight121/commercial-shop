import Menu from "../components/Menu"
import Footer from "../components/Footer"
import ProductShowcase from "../components/ProductShowcase"
import { useState } from "react"
import ProductDetail from "../components/ProductDetail"

export default function Product(): JSX.Element {
  let page: JSX.Element = (<div></div>)

  const [productid, setProductId] = useState<string>("")
  const [search, setSearch] = useState<string>("")

  const handleProductdetail = (value: string) => {
    setProductId(value)
  }
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue)
  }

  page = (
    <div>
      <Menu />

      <img src="./src/assets/banner.png" />

      {productid === "" ?
        <ProductShowcase handleProductdetail={handleProductdetail}/>
        :
        <ProductDetail productid={productid} />
      }

      <Footer />
    </div>
  );

  return page
}
