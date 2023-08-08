import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import Menu from "../components/Menu"
import Footer from "../components/Footer"

interface ApiResponse {
  message: string
}

function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined
}

async function getApiSession(username: string, token: string): Promise<ApiResponse> {
  try {
    const response = await axios.get(`http://localhost:4505/api/account/${username}?token=${token}`)
    return response.data
  } catch (error) {
    throw new Error("Can't get data")
  }
}

function Home(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const handleLoggedIn = async (value: boolean) => {
    setLoggedIn(value)
    const username = Cookies.get("loginUsernameCookie")
    await axios.patch(`http://localhost:4505/api/account/${username}`, {
      token: ""
    })
    Cookies.remove("loginTokenCookie")
    Cookies.remove("loginUsernameCookie")
  }

  useEffect(() => {
    const token = Cookies.get("loginTokenCookie")
    const username = Cookies.get("loginUsernameCookie")
    
    if (!isNullOrUndefined(token) || !isNullOrUndefined(username)) {
      getApiSession(username!, token!)
        .then((user_data: any) => {
          if (user_data.session === token) {
            setLoggedIn(true)
          }
        })
        .catch((error: any) => {
          console.log("Can't get data from api")
          console.log(error)
        });
    }
  }, [])

  return (
    <div>
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <Footer />
    </div>
  )
}

export default Home
