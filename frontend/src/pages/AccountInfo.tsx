import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

import Menu from "../components/Menu";

import isNullOrUndefined from "../utils/check";

interface ApiResponse {
  message: string;
}

interface AccountInfoObject {
  username: string;
  displayName: string;
  email: string;
  active: number;
}

async function getApiAccountInfo(username: string): Promise<ApiResponse> {
  try {
    const response = await axios.get(
      `http://localhost:4505/api/account/${username}?userinfo=true`
    );
    return response.data;
  } catch (error) {
    throw new Error("Can't get data");
  }
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

function AccountInfo(): JSX.Element {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [accountInfo, setAccountInfo] = useState<AccountInfoObject>();

  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordAgain, setNewPasswordAgain] = useState<string>("");

  const handleLoggedIn = async (value: boolean) => {
    setLoggedIn(value);
    const username = Cookies.get("loginUsernameCookie");
    await axios.patch(`http://localhost:4505/api/account/${username}`, {
      active: -1,
      token: "",
    });
    Cookies.remove("loginTokenCookie");
    Cookies.remove("loginUsernameCookie");
    navigate("/");
  };

  const handleSaveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (displayName !== "" || email !== "") {
      const username = Cookies.get("loginUsernameCookie");
      await axios.patch(`http://localhost:4505/api/account/${username}`, {
        active: -1,
        displayName: displayName,
        email: email,
      });
      alert("Thay đổi thông tin thành công!");
      return;
    }

    alert("Vui lòng nhập đầy đủ thông tin cần thay đổi!");
  };

  const handleChangePassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (password !== "" || newPassword !== "" || newPasswordAgain !== "") {
      const username = Cookies.get("loginUsernameCookie");
      await axios.get(
        `http://localhost:4505/api/account/checklogin/${username}?password=${password}`
      );
      if (newPassword === newPasswordAgain) {
        await axios.patch(`http://localhost:4505/api/account/${username}`, {
          active: -1,
          password: newPassword,
        });
        alert("Thay đổi mật khẩu thành công");
        return;
      }

      alert("Vui lòng nhập lại mật khẩu mới!");
      return;
    }

    alert("Vui lòng nhập đầy đủ thông tin cần thay đổi!");
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get Login session for menu
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

        // Get account info
        const accountinfo: any = await getApiAccountInfo(username!);
        setAccountInfo(accountinfo);
        setDisplayName(accountinfo.displayName);
        setEmail(accountinfo.email);
      } else {
        navigate("/");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />
      <div className="mt-4 py-4 w-full bg-grey-light text-coffee text-center text-2xl font-semibold ">
        THÔNG TIN TÀI KHOẢN
      </div>
      <div>
        {accountInfo !== null ? (
          <div className="mx-auto mt-10 w-4/6 flex">
            <div className="w-1/2">
              <form onSubmit={handleSaveProfile}>
                <div className="flex">
                  <p className="w-1/3 font-semibold">Tên tài khoản:</p>
                  <p> {accountInfo?.username}</p>
                </div>
                <div className="flex my-4">
                  <p className="w-1/3 font-semibold">Tên hiển thị: </p>
                  <input
                    type="text"
                    value={displayName}
                    className="w-1/2 border-2 border-coffee px-1 bg-grey-light"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setDisplayName(event.target.value)
                    }
                  />
                </div>

                <div className="flex my-4">
                  <p className="w-1/3 font-semibold">Email: </p>
                  <input
                    type="text"
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(event.target.value)
                    }
                    className="w-1/2 border-2 border-coffee px-1 bg-grey-light"
                  />
                </div>

                <div className="flex">
                  <p className="w-1/3 font-semibold">Xác thực tài khoản:</p>
                  <p> {accountInfo?.active === 1 && "Đã kích hoạt"}</p>
                </div>

                <input
                  type="submit"
                  value="Lưu thay đổi"
                  className="px-4 mx-auto py-1 mt-4 bg-coffee text-xl text-white font-barlow block"
                />
              </form>
            </div>
            <div className="w-1/5"></div>
            <div className="w-1/2">
              <form onSubmit={handleChangePassword}>
                <div className="flex">
                  <p className="w-2/3 font-semibold">
                    Nhập mật khẩu hiện tại:{" "}
                  </p>
                  <input
                    type="text"
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(event.target.value)
                    }
                    className="w-1/2 border-2 border-coffee px-1 bg-grey-light"
                  />
                </div>
                <div className="flex my-4">
                  <p className="w-2/3 font-semibold">Nhập mật khẩu mới: </p>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setNewPassword(event.target.value)
                    }
                    className="w-1/2 border-2 border-coffee px-1 bg-grey-light"
                  />
                </div>
                <div className="flex">
                  <p className="w-2/3 font-semibold">Nhập lại mật khẩu mới: </p>
                  <input
                    type="text"
                    value={newPasswordAgain}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setNewPasswordAgain(event.target.value)
                    }
                    className="w-1/2 border-2 border-coffee px-1 bg-grey-light"
                  />
                </div>
                <input
                  type="submit"
                  value="Thay đổi mật khẩu"
                  className="px-4 mx-auto py-1 mt-14 bg-coffee text-xl text-white font-barlow block"
                />
              </form>
            </div>
          </div>
        ) : (
          <div>Không tìm thấy dữ liệu</div>
        )}
      </div>
    </div>
  );
}

export default AccountInfo;
