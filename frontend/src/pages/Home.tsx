import Cookies from "js-cookie"
import { useEffect, useState } from "react";

import Menu from "../components/Menu";
import Footer from "../components/Footer";
import axios from "axios";

interface ApiResponse {
  message: string;
}

function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

async function getApiSession(username: string, token: string): Promise<ApiResponse> {
  try {
    const response = await axios.get(`http://localhost:4505/api/account/${username}?token=${token}`)
    return response.data
  } catch (error) {
    throw new Error("Can't get data");
  }
}

function Home(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const token = Cookies.get("loginTokenCookie");
    const username = Cookies.get("loginUsernameCookie");
    
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
  }, []);

  console.log(loggedIn)

  return (
    <div>
      <Menu />

      <Footer />
    </div>
  )
}

export default Home;
