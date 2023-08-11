import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Menu from "../components/Menu";

import isNullOrUndefined from "../utils/check";

interface ApiResponse {
  message: string;
}

async function getApiSession(
  username: string,
  token: string
): Promise<ApiResponse> {
  try {
    const response = await axios.get(
      `http://localhost:4505/api/account/${username}?token=${token}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Can't get data");
  }
}

function NotFound(): JSX.Element {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLoggedIn = async (value: boolean) => {
    setLoggedIn(value);
    const username = Cookies.get("loginUsernameCookie");
    await axios.patch(`http://localhost:4505/api/account/${username}`, {
      active: -1,
      token: "",
    });
    Cookies.remove("loginTokenCookie");
    Cookies.remove("loginUsernameCookie");
  };

  useEffect(() => {
    const token = Cookies.get("loginTokenCookie");
    const username = Cookies.get("loginUsernameCookie");

    if (!isNullOrUndefined(token) || !isNullOrUndefined(username)) {
      getApiSession(username!, token!)
        .then((user_data: any) => {
          if (user_data.session === token) {
            setLoggedIn(true);
          }
        })
        .catch((error: any) => {
          console.log("Can't get data from api");
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <div className="pt-40 pb-10 mx-auto">
        <h1 className="text-center text-6xl">Không tìm thấy trang</h1>
        <p className="text-center text-xl mt-8">Vui lòng thử lại trang khác</p>
        <a
          href="/"
          className="py-2 bg-blue-light block w-1/5 px-6 text-center mx-auto mt-10 hover:text-red-600">
          Bấm vào đây để quay về trang chủ
        </a>
      </div>
    </div>
  );
}

export default NotFound;
