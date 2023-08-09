import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";

import Menu from "../components/Menu"
import Footer from "../components/Footer"
import ListProductHomePage from "../components/ListProductHomePage";

interface ApiResponse {
  message: string;
}

type ProductDetail = {
  handleProductId: (value: string) => void;
};

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
    );
    return response.data
  } catch (error) {
    throw new Error("Can't get data")
  }
}

function Home(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [productid, setProductId] = useState<string>("")

  const handleProductId = (value: string) => {
    setProductId(value)
  }

  const handleLoggedIn = async (value: boolean) => {
    setLoggedIn(value)
    const username = Cookies.get("loginUsernameCookie")
    await axios.patch(`http://localhost:4505/api/account/${username}`, {
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
            setLoggedIn(true);
          }
        })
        .catch((error: any) => {
          console.log("Can't get data from api")
          console.log(error)
        })
    }
  }, [])

  return (
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <img src="./src/assets/banner.png" alt="" className="w-10/12 mx-auto" />

      <p className="mt-10 text-center text-4xl font-semibold">SẢN PHẨM</p>

      <ListProductHomePage handleProductId={handleProductId} />
      <Footer />
    </div>
  );
}

export default Home;
