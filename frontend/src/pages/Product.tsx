import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Menu from "../components/Menu";
import Footer from "../components/Footer";
import ProductShow from "../components/ProductShow";
import ProductDetail from "../components/ProductDetail";

import { API_URL } from "../utils/URL"
import isNullOrUndefined from "../utils/check";

interface ApiResponse {
  message: string
}

async function getApiSession(
  username: string,
  token: string
): Promise<ApiResponse> {
  try {
    const response = await axios.get(
      `http://localhost:4505/api/account/${username}?token=${token}`
    )
    return response.data
  } catch (error) {
    throw new Error("Can't get data")
  }
}

export default function Product(): JSX.Element {
  let page: JSX.Element = <></>

  // Declare login
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const [productid, setProductId] = useState<string>("")
  const [search, setSearch] = useState<string>("")

  const handleProductId = (value: string) => {
    setProductId(value)
  }
  const handleSearch = (searchValue: string) => {
    setSearch(searchValue)
  }

  const handleLoggedIn = async (value: boolean) => {
    setLoggedIn(value)
    const username = Cookies.get("loginUsernameCookie")
    await axios.patch(`${API_URL}/account/${username}`, {
      active: -1,
      token: "",
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
        })
    }
  }, [])

  page = (
    <div>
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <img
        className="w-10/12 mx-auto mt-2"
        src="./src/assets/banner-product.png"
        alt="Banner"
      />

      <ProductShow handleProductId={handleProductId} />
    </div>
  )

  return page
}
