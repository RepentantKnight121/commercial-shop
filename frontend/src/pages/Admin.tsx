import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import AdminDisplay from "../components/admin/AdminDisplay"
import AdminMenu from "../components/admin/AdminMenu"
import Footer from "../components/Footer"
import Menu from "../components/Menu"

interface ApiResponse {
  message: string
}

function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

async function getApiSession(username: string, token: string): Promise<ApiResponse> {
  try {
    const response = await axios.get(`http://localhost:4505/api/account/${username}?token=${token}`)
    return response.data
  } catch (error) {
    throw new Error("Can't get data")
  }
}

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [display, setDisplay] = useState<string>("")
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)

  const handleDisplayChange = (display: string) => {
    setDisplay(display)
  }

  const handleLoggedIn = async (value: boolean) => {
    setLoggedIn(value)
    const username = Cookies.get("loginUsernameCookie")
    await axios.patch(`http://localhost:4505/api/account/${username}`, {
      token: ""
    })
    Cookies.remove("loginTokenCookie")
    Cookies.remove("loginUsernameCookie")
  }

  const handleLimit = (limit: number) => {
    setLimit(limit)
  }

  const handlePage = (page: number) => {
    setPage(page)
  }

  useEffect(() => {
    const token = Cookies.get("loginTokenCookie")
    const username = Cookies.get("loginUsernameCookie")
    
    if (!isNullOrUndefined(token) || !isNullOrUndefined(username)) {
      getApiSession(username!, token!)
        .then((user_data: any) => {
          if (user_data.session === token) {
            if (user_data.roleId === 1) {
              setLoggedIn(true)
              setIsAdmin(true)
            }
            alert("You are not admin this page is not for you")
          }
        })
        .catch((error: any) => {
          console.log("Can't get data from api")
          console.log(error)
        });
    }
  }, [loggedIn]);

  return (
    <div>
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      {isAdmin ? 
        (
        <div className="mx-auto py-20 w-11/12 flex font-barlow">
          <AdminMenu limit={limit} setDisplay={handleDisplayChange} setLimit={handleLimit} />
          <AdminDisplay display={display} limit={limit} page={page} setPage={handlePage} />
        </div>
        )
        :
        <div></div>
      }

      <Footer />
    </div>
  )
}
