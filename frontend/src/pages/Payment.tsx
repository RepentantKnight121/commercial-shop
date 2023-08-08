import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"

import Footer from "../components/Footer"
import Menu from "../components/Menu"


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

export default function Payment(): JSX.Element {
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
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <div className="mt-4 py-4 w-full bg-grey-light text-coffee text-center text-2xl font-semibold ">
        Thanh toán
      </div>
      <div className="mt-10 mb-1 flex w-4/5 px-14 mx-auto">
        {/* Thông tin nhận hàng */}
        <div className=" w-2/5">
          <p className="text-center font-semibold">THÔNG TIN NHẬN HÀNG</p>
          <p className="mt-6 mb-2">Họ và tên</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <p className="mt-6 mb-2">Email</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <p className="mt-6 mb-2">Số điện thoại</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
          <p className="mt-6 mb-2">Địa chỉ giao hàng</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light" />
        </div>
        {/* Thông tin đơn hàng */}
        <div className=" w-3/5 ml-16">
          <p className="text-center font-semibold">ĐƠN HÀNG</p>
          <div className="w-full mt-6 mb-2 h-px mx-auto bg-neutral-300"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
