import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import Menu from "../components/Menu"
import Footer from "../components/Footer"

interface ApiResponse {
  message: string
}

function allStorage(): (string | null)[] {
  var values: (string | null)[] = [],
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
      values.push( localStorage.getItem(keys[i]) );
  }

  return values;
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

function Cart(): JSX.Element {
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
    // Get user login
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

    const items = allStorage();

    console.log(items)
  }, [])

  return (
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <div className="mt-4 py-4 w-full bg-grey-light text-coffee text-center text-2xl font-semibold ">
        GIỎ HÀNG
      </div>
      <div className="mt-10 mb-1 flex w-4/5 px-14 mx-auto">
        <p className="w-3/5">Sản phẩm</p>
        <div className="flex justify-between w-2/5 ">
          <p>Số lượng</p>
          <p>Tạm tính</p>
          <p>Xóa</p>
        </div>
      </div>
      <div className="w-4/5 h-px mx-auto bg-neutral-300">
        {}
      </div>

      <div className="mt-10 flex w-1/5 mx-auto">
        <button className="mx-2 px-8 py-3 bg-coffee text-2xl text-white font-barlow">Thanh toán</button>
        <button className="mx-2 px-8 py-3 bg-grey-light text-2xl text-coffee font-barlow">Xóa tất cả</button>
      </div>

      <Footer />
    </div>
  )
}

export default Cart
