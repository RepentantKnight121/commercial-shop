import axios from "axios"
import { useNavigate } from "react-router"
import { useState } from "react"
import Cookies from "js-cookie"

import Menu from "../components/Menu"
import Footer from "../components/Footer"

async function getApiUser(username: string) {
  try {
    const response = await axios.get(`http://localhost:4505/api/account/${username}`)
    return response.data
  } catch (error) {
    return [{ message: "Can't get data" }]
  }
}

function LoginRegister(): JSX.Element {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [usernameLogin, setUsernameLogin] = useState("")
  const [passwordLogin, setPasswordLogin] = useState("")
  const [usernameRegister, setUsernameRegister] = useState("")
  const [passwordRegister, setPasswordRegister] = useState("")
  const [passwordRegisterAgain, setPasswordRegisterAgain] = useState("")
  const [emailRegister, setEmailRegister] = useState("")

  const handleLoggedIn = async (value: boolean) => {
    setLoggedIn(value)
    const username = Cookies.get("loginUsernameCookie")
    await axios.patch(`http://localhost:4505/api/account/${username}`, {
      active: -1,
      token: ""
    })
    Cookies.remove("loginTokenCookie")
    Cookies.remove("loginUsernameCookie")
  }

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (usernameLogin === "" || passwordLogin === "") {
      alert("Vui lòng, điền đầy đủ thông tin đăng nhập")
    } else {
      await axios.post("http://localhost:4505/api/auth/login", {
        username: usernameLogin,
        password: passwordLogin
      }, {
        withCredentials: true
      })
      .then(async () => {
        const userdata: any = await getApiUser(usernameLogin)
        if (userdata.active == 1) {
          if (userdata.roleId === 1) {
            navigate("/admin")
            // Set the 'loggedIn' cookie
            Cookies.set("loginUsernameCookie", userdata.username, {sameSite: "Lax"})
            Cookies.set('loginTokenCookie', userdata.session, {sameSite: "Lax"})
          } else {
            navigate("/")
            // Set the 'loggedIn' cookie
            Cookies.set("loginUsernameCookie", userdata.username, {sameSite: "Lax"})
            Cookies.set('loginTokenCookie', userdata.session, {sameSite: "Lax"})
          }
        }
      })
      .catch((error) => {
        console.log(error)
        alert("Thông tin đăng nhập chưa đúng! Vui lòng thử lại!")
      })
    }
  }

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (usernameRegister === "" || passwordRegister === "" || passwordRegisterAgain === "" || emailRegister === "") {
      alert("Vui lòng, điền đầy đủ thông tin đăng ký")
    } else {
      if (passwordRegister === passwordRegisterAgain) {
        await axios
        .post("http://localhost:4505/api/auth/register", {
          username: usernameRegister,
          password: passwordRegister,
          email: emailRegister,
        })
        .then(() => {
          alert("Đăng ký thành công. Vui lòng đợi khi được xác minh để đăng nhập")
          setUsernameRegister("")
          setEmailRegister("")
          setPasswordRegister("")
          setPasswordRegisterAgain("")
        })
        .catch(function (error) {
          console.log(error)
        })
      } else {
        alert("Vui lòng, nhập mật khẩu đúng mật khẩu!")
      }
    }
  }

  return (
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <div className="mt-4 py-4 w-full bg-grey-light text-coffee text-center text-2xl font-semibold ">
        TÀI KHOẢN
      </div>

      {/* Space Login and Register  */}
      <div className="mt-10 flex w-4/5 mx-auto">
        {/* Space Login */}
        <form className="w-2/5" onSubmit={handleLoginSubmit}>
          <div className="text-coffee text-xl w-full font-semibold">
            Đăng nhập
          </div>
          <p className="mt-6 mb-2">Tên tài khoản</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUsernameLogin(event.target.value)}} />
          <p className="my-2">Mật khẩu</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPasswordLogin(event.target.value)}}/>
          <div className="flex justify-between mt-4">
            <div className="flex">
              <input className="mr-1" type="checkbox" />
              <label>Nhớ mật khẩu</label>
            </div>
            <p className="underline underline-offset-2">Quên mật khẩu ?</p>
          </div>
          <div className="flex justify-center">
            <input className="py-2 w-36 mt-8 bg-grey-light hover:cursor-pointer"
              type="submit" value="Đăng nhập"></input>
          </div>
        </form>

        <div className=" w-1/5">
          <div className="bg-coffee mx-auto w-px h-full"></div>
        </div>

        {/* Space Register */}
        <form className=" w-2/5" onSubmit={handleRegisterSubmit}>
          <div className="text-coffee text-xl w-full font-semibold">
            Đăng ký
          </div>
          <p className="mt-6 mb-2">Tên tài khoản</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUsernameRegister(event.target.value)}} />
          <p className="my-2">Email</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmailRegister(event.target.value)}} />
          <p className="my-2">Mật khẩu</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPasswordRegister(event.target.value)}} />
          <p className="my-2">Nhập lại mật khẩu</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPasswordRegisterAgain(event.target.value)}} />
          <div className="flex justify-center">
            <input className="py-1 w-36 mt-8 bg-grey-light hover:cursor-pointer"
              type="submit" value="Đăng ký" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginRegister
