import { useState } from "react"

import AdminDisplay from "../components/admin/AdminDisplay"
import AdminMenu from "../components/admin/AdminMenu"
import Footer from "../components/Footer"
import Menu from "../components/Menu"

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
      <Menu />

      <div className="mx-auto py-20 w-10/12 flex font-barlow">
        <AdminMenu limit={limit} setDisplay={handleDisplayChange} setLimit={handleLimit} />
        <AdminDisplay display={display} limit={limit} page={page} setPage={handlePage} />
      </div>

      <Footer />
    </div>
  )
}
