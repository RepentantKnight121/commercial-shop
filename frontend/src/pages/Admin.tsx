import { useState } from "react"

import AdminDisplay from "../components/AdminDisplay"
import AdminMenu from "../components/AdminMenu"
import Footer from "../components/Footer"
import HeaderContact from "../components/HeaderContact"
import Menu from "../components/Menu"
import HideOnScroll from "../utils/HideOnScroll"

export default function Admin() {
  const [display, setDisplay] = useState<string>("")
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)

  const handleDisplayChange = (display: string) => {
    setDisplay(display)
  }

  const handleLimit = (limit: number) => {
    setLimit(limit)
  }

  const handlePage = (page: number) => {
    setPage(page)
  }

  return (
    <div>
      <HideOnScroll>
        <HeaderContact />
      </HideOnScroll>

      <Menu />

      <div className="mx-auto py-20 w-10/12 flex font-barlow">
        <AdminMenu setDisplay={handleDisplayChange}/>
        <AdminDisplay display={display} limit={limit} page={page} />
      </div>

      <Footer />
    </div>
  )
}
