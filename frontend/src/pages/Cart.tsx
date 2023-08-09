import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { v4 as uuidv4 } from "uuid"
import Cookies from "js-cookie"

import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Menu from "../components/Menu"
import Footer from "../components/Footer"


interface ApiResponse {
  message: string
}

function allStorage(): (string | null)[] {
  var values: (string | null)[] = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]))
  }

  return values
}

function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined
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

function Cart(): JSX.Element {
  // Link to other page and refresh page
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState<boolean>(false)

  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [products, setProducts] = useState<any[]>([])
  var totalMoney = 0

  const handleLoggedIn = async (value: boolean) => {
    setLoggedIn(value)
    const username = Cookies.get("loginUsernameCookie")
    await axios.patch(`http://localhost:4505/api/account/${username}`, {
      active: -1,
      token: "",
    })
    Cookies.remove("loginTokenCookie")
    Cookies.remove("loginUsernameCookie")
  }

  const handleDeleteAllCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    localStorage.clear()
    setProducts([])
  }

  const handleDeleteItemCart = async(
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    value: string
  ) => {
    event.preventDefault()

    localStorage.removeItem(value)
    setRefresh(!refresh)
  }

  const handleAmountChange = (index: number, newValue: number) => {
    setProducts((prevProducts) => {
      const updatedProducts: any = [...prevProducts]
      updatedProducts[index].amount = newValue
      return updatedProducts
    })
  }

  const handlePayment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (!loggedIn) {
      alert(
        "Vui lòng, tạo tài khoản và đăng nhập trước khi tiến hành thanh toán"
      )
      return
    }

    navigate("/payment")
  }

  const convertMoneyToVND = (money: number) => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
        })
    }

    const items = allStorage()
    const productObjects = items.map((item) => JSON.parse(item || ""))
    setProducts(productObjects)
  }, [refresh])


  return (
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <div>
        <div className="mt-4 py-4 w-full bg-grey-light text-coffee text-center text-2xl font-semibold">
          GIỎ HÀNG
        </div>
        <table className="mt-10 mb-1 w-8/12 px-14 mx-auto">
          <thead>
            <tr>
              <th className="w-4/6">Sản phẩm</th>
              <th>Số lượng</th>
              <th>Tạm tính</th>
              <th>Xóa</th>
            </tr>
          </thead>

          <tbody>
            {products !== null ? (
              products.map((value: any, index: number) => (
                <tr key={uuidv4()}>
                  <span className="hidden"> {(totalMoney += value.price)}</span>
                  <td className="w-3/5 flex mt-5">
                    <img
                      src={`data:image/png;base64,${value.image}`}
                      className="w-2/6"
                    />
                    <p className="mx-5 flex-row">
                      <p>{value.name}</p>
                      <p>{convertMoneyToVND(value.price)}đ</p>
                    </p>
                  </td>
                  <td className="text-center">
                    <input
                      className="text-center w-10"
                      type="number"
                      min="1"
                      max="10"
                      value={value.amount}
                      onChange={(event) => handleAmountChange(index, parseInt(event.target.value))}
                    />
                  </td>
                  <td className="text-center">
                    {convertMoneyToVND(value.price * value.amount)}đ
                  </td>
                  <td className="text-center">
                    <button className="text-xl text-rose-500 hover:cursor-pointer"
                      // @ts-ignore
                      onClick={(event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => handleDeleteItemCart(event, value.id)}>
                      <FontAwesomeIcon
                        icon={faTrash} />
                      </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="my-10 flex w-8/12 mx-auto justify-between">
        <button
          className="px-8 py-2 bg-coffee text-lg text-white font-barlow"
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            handlePayment(event)
          }>
          Thanh toán
        </button>
        <div className="flex">
          <p className="my-auto mx-4 font-semibold">
            Tổng số lượng sản phẩm: {products.reduce((total, product) => total + product.amount, 0)}
          </p>
          <p className="my-auto mx-4 font-semibold">
            Tổng tiền tạm tính : {convertMoneyToVND(totalMoney)} VND
          </p>
          <button
            className="px-8 py-2 bg-grey-light text-lg text-coffee font-barlow"
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleDeleteAllCart(event)
            }>
            Xóa tất cả
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Cart
