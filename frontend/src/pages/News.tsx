import Menu from "../components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

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

function News(): JSX.Element {
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

  return (
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      {/* main content */}
      <div className="w-4/5 my-10 mx-auto pb-20">
        <img src="/src/assets/about.png" alt="1" />
        <img src="/src/assets/about1.png" alt="2" />
        <img src="/src/assets/about2.png" alt="3" />
        <img src="/src/assets/about3.png" alt="4" />
      </div>
    </div>
  );
}

export default News;
