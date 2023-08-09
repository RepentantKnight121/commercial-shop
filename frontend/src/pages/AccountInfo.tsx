import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Cookies from "js-cookie"

import Footer from "../components/Footer"
import Menu from "../components/Menu"

interface ApiResponse {
  message: string
}

interface AccountInfoObject {
  username: string
  displayName: string
  email: string
  active: number
}

function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined
}

async function getApiAccountInfo(username: string): Promise<ApiResponse> {
  try {
    const response = await axios.get(
      `http://localhost:4505/api/account/${username}?userinfo=true`
    )
    return response.data
  } catch (error) {
    throw new Error("Can't get data")
  }
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

function AccountInfo(): JSX.Element {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [accountInfo, setAccountInfo] = useState<AccountInfoObject>()

  const [displayName, setDisplayName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [newPasswordAgain, setNewPasswordAgain] = useState<string>("")

  const handleLoggedIn = async (value: boolean) => {
    setLoggedIn(value)
    const username = Cookies.get("loginUsernameCookie")
    await axios.patch(`http://localhost:4505/api/account/${username}`, {
      active: -1,
      token: "",
    })
    Cookies.remove("loginTokenCookie")
    Cookies.remove("loginUsernameCookie")
    navigate("/")
  }

  useEffect(() => {
    const fetchData = async () => {
      // Get Login session for menu
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

        // Get account info
        const accountinfo: any = await getApiAccountInfo(username!)
        setAccountInfo(accountinfo)
        setDisplayName(accountinfo.displayName)
        setEmail(accountinfo.email)
      } else {
        navigate("/")
      }
    }
    
    fetchData()
  }, [])

  console.log(accountInfo)

  return (
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <h1 className="text-center text-4xl">Thông tin tài khoản</h1>
      {accountInfo !== null
        ?
        (
          <form className="mx-auto w-3/5 flex-row">
            <p>Tên tài khoản: {accountInfo?.username}</p>
            <div>
              <span>Tên hiển thị: </span>
              <input type="text" value={accountInfo?.displayName} />
            </div>
            <div>
              <span>Email: </span>
              <input type="text" value={accountInfo?.email} />
            </div>1
            <p>Xác thực tài khoản: {accountInfo?.active === 1 && "Đã kích hoạt"}</p>
            <input type="submit" value="Lưu thay đổi" />
          </form>
        )
        :
        <div>Không tìm thấy dữ liệu</div>
      }

      <Footer />
    </div>
  )
}

export default AccountInfo