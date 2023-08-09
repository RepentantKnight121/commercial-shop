import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type UserInfoProps = {
  loggedIn: boolean;
  handleLoggedIn: (value: boolean) => void;
};

export default function UserInfo(props: UserInfoProps): JSX.Element {
  let component: JSX.Element = <div></div>;
  const [isUserDetail, setUserDetail] = useState<boolean>(false);

  const handleLoggedIn = (value: boolean) => {
    props.handleLoggedIn(value);
  };

  if (props.loggedIn) {
    component = (
      <div>
        <FontAwesomeIcon
          className="hover:cursor-pointer h-5 mx-2 text-blue-light"
          icon={faUser}
          onClick={() => {
            setUserDetail(!isUserDetail);
          }}
        />
        <div className={isUserDetail ? "" : "hidden"}>
          <div className="absolute bg-grey-light right-0 top-16 p-4 rounded-md">
            <a href="/userinfo">Thông tin tài khoản</a>
            <p
              className="px-3 py-2 my-3 text-center text-white bg-blue-light rounded-3xl ml-4 hover:text-black"
              onClick={() => handleLoggedIn(!props.loggedIn)}>
              Đăng xuất
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    component = (
      <a
        href="login-register"
        className="px-3 py-2 bg-blue-light rounded-3xl ml-4 hover:text-neutral-50">
        Đăng nhập / Đăng ký
      </a>
    );
  }

  return component;
}
