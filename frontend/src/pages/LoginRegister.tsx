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
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [email, setEmail] = useState("")

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === "" || password === "") {
      alert("Vui lòng, điền đầy đủ thông tin đăng nhập")
    } else {
      await axios.post("http://localhost:4505/api/auth/login", {
        username: username,
        password: password
      }, {
        withCredentials: true
      })
      .then(async () => {
        const userdata: any = await getApiUser(username)
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
      })
      .catch((error) => {
        console.log(error)
        alert("Thông tin đăng nhập chưa đúng! Vui lòng thử lại!")
      })
    }
  }

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === "" || password === "" || passwordAgain === "" || email === "") {
      alert("Vui lòng, điền đầy đủ thông tin đăng ký")
    } else {
      if (password === passwordAgain) {
        await axios
        .post("http://localhost:4505/api/auth/register", {
          username: username,
          password: password,
          email: email,
        })
        .then(() => {
          alert("Đăng ký thành công. Vui lòng đợi khi được xác minh để đăng nhập")
          navigate("/login-register")
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
      <Menu />

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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)}} />
          <p className="my-2">Mật khẩu</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}}/>
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setUsername(event.target.value)}} />
          <p className="my-2">Email</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)}} />
          <p className="my-2">Mật khẩu</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPassword(event.target.value)}} />
          <p className="my-2">Nhập lại mật khẩu</p>
          <input className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            type="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setPasswordAgain(event.target.value)}} />
          <div className="flex justify-center">
            <input className="py-1 w-36 mt-8 bg-grey-light hover:cursor-pointer"
              type="submit" value="Đăng ký" />
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default LoginRegister
