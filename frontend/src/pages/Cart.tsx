import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { v4 as uuidv4 } from "uuid"
import Cookies from "js-cookie"

import Menu from "../components/Menu"
import Footer from "../components/Footer"

interface ApiResponse {
  message: string
}

function allStorage(): (string | null)[] {
  var values: (string | null)[] = [],
    keys = Object.keys(localStorage),
    i = keys.length

  while (i--) {
    values.push(localStorage.getItem(keys[i]))
  }

  return values
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

function CartPayment(): JSX.Element {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [products, setProducts] = useState<Object[]>([])

  const handleLoggedIn = async (value: boolean) => {
    setLoggedIn(value)
    const username = Cookies.get("loginUsernameCookie")
    await axios.patch(`http://localhost:4505/api/account/${username}`, {
      token: "",
    })
    Cookies.remove("loginTokenCookie")
    Cookies.remove("loginUsernameCookie")
  }

  const handleDeleteAllCart = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    localStorage.clear()
    setProducts([])
  }

  const handlePayment = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    if (!loggedIn) {
      alert("Vui lòng, tạo tài khoản và đăng nhập trước khi tiến hành thanh toán")
      return
    }

    navigate("/payment")
  }

  useEffect(() => {
    // Get user login
    const token = Cookies.get("loginTokenCookie")
    const username = Cookies.get("loginUsernameCookie")

    if (!isNullOrUndefined(token) || !isNullOrUndefined(username)) {
      getApiSession(username!, token!)
        .then((user_data: any) => {
          if (user_data.session === token) {
            setLoggedIn(true);
          }
        })
        .catch((error: any) => {
          console.log("Can't get data from api")
          console.log(error)
        })
    }

    const items = allStorage()
    const productObjects = items.map((item) => JSON.parse(item || ""))
    setProducts(productObjects)
  }, [])

  return (
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <div>
        <div className="mt-4 py-4 w-full bg-grey-light text-coffee text-center text-2xl font-semibold">
          GIỎ HÀNG
        </div>
        <div className="mt-10 mb-1 flex w-4/5 px-14 mx-auto">
          <p className="w-3/5">Sản phẩm</p>
          <div className="flex justify-between w-2/5 text-center">
            <p>Số lượng</p>
            <p>Tạm tính</p>
            <p>Xóa</p>
          </div>
        </div>
        <div className="w-4/5 h-px mx-auto bg-neutral-300">
        {products !== null &&
          products.map((value: any) => (
            <div key={uuidv4()} className="flex">
              <div className="w-3/5 flex">
                <img src={`data:image/png;base64,${value.image}`} height={25} width={25} />
                <p>{value.name}</p>
              </div>
              <div className="flex justify-between w-2/5 text-center">
                <p>{value.amount}</p>
                <p>{value.price * value.amount}</p>
                <p>Xóa</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex w-1/5 mx-auto">
        <button className="mx-2 px-8 py-3 bg-coffee text-2xl text-white font-barlow"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handlePayment(event)}>Thanh toán</button>
        <button className="mx-2 px-8 py-3 bg-grey-light text-2xl text-coffee font-barlow"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleDeleteAllCart(event)}>Xóa tất cả</button>
      </div>

      <Footer />
    </div>
  )
}

export default CartPayment
