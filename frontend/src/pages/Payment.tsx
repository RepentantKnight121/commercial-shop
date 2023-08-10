import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

import Footer from "../components/Footer";
import Menu from "../components/Menu";

interface ApiResponse {
  message: string;
}

function generateRandomKeywords(): string[] {
  const keywords: string[] = [];
  const validAsciiRange = { start: 32, end: 126 };

  const getRandomLength = () => Math.floor(Math.random() * 20) + 1; // Random length between 1 and 20

  for (let i = 0; i < 100; i++) {
    // Generating 100 random keywords for demonstration
    const keywordLength = getRandomLength();
    let keyword = "";

    for (let j = 0; j < keywordLength; j++) {
      const randomAscii =
        Math.floor(
          Math.random() * (validAsciiRange.end - validAsciiRange.start + 1)
        ) + validAsciiRange.start;
      keyword += String.fromCharCode(randomAscii);
    }

    keywords.push(keyword);
  }

  return keywords;
}

function allStorage(): (string | null)[] {
  var values: (string | null)[] = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return values;
}

function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
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

async function getNewestBill(): Promise<ApiResponse> {
  try {
    const response = await axios.get(
      `http://localhost:4505/api/bill-info?newest=true`
    );
    return response.data;
  } catch (error) {
    throw new Error("Can't get data");
  }
}

const convertMoneyToVND = (money: number) => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
};

export default function Payment(): JSX.Element {
  // Login
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  // Store products
  const [products, setProducts] = useState<Object[]>([]);

  // Customer Form
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  var totalMoney = 0;

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

  const handlePayment = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (loggedIn) {
      if (products !== null) {
        await axios
          .post(`http://localhost:4505/api/bill-info?default=true`, {
            accountUsername: Cookies.get("loginUsernameCookie"),
            name: name,
            email: email,
            phone: phone,
            address: address,
          })
          .then(async () => {
            const newestBill: any = await getNewestBill();
            console.log(newestBill);
            products.map(async (value: any) => {
              await axios.post(`http://localhost:4505/api/bill-detail`, {
                billId: newestBill.id,
                productId: value.id,
                discountId: "1",
                amount: value.amount,
              });
            });

            // Message to user
            alert("Đơn hàng đã được gửi!");
          })
          .catch((error) => {
            console.log(error);
            alert("Đơn hàng không gửi được!");
          });

        return;
      }
    }

    alert("Vui lòng đăng nhập trước khi tiến hành thanh toán!");
  };

  useEffect(() => {
    // Check login or not
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

    // Get products from local storage
    const items = allStorage();
    const productObjects = items.map((item) => JSON.parse(item || ""));
    setProducts(productObjects);
  }, []);

  return (
    <div className="font-barlow">
      <Menu loggedIn={loggedIn} handleLoggedIn={handleLoggedIn} />

      <div className="mt-4 py-4 w-full bg-grey-light text-coffee text-center text-2xl font-semibold ">
        Thanh toán
      </div>
      <div className="mt-10 mb-1 flex w-4/5 px-14 mx-auto">
        {/* Thông tin nhận hàng */}
        <div className=" w-2/5">
          <p className="text-center font-semibold">THÔNG TIN NHẬN HÀNG</p>
          <p className="mt-6 mb-2">Họ và tên</p>
          <input
            className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <p className="mt-6 mb-2">Email</p>
          <input
            className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
          <p className="mt-6 mb-2">Số điện thoại</p>
          <input
            className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPhone(event.target.value)
            }
          />
          <p className="mt-6 mb-2">Địa chỉ giao hàng</p>
          <input
            className="border-2 border-coffee px-1 w-full h-9 bg-grey-light"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(event.target.value)
            }
          />

          <button
            className="my-10 block mx-auto px-4 py-1 bg-coffee text-2xl text-white font-barlow hover:cursor-pointer"
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handlePayment(event)
            }>
            Thanh toán
          </button>
        </div>
        {/* Thông tin đơn hàng */}
        <div className=" w-3/5 ml-16">
          <p className="text-center font-semibold">ĐƠN HÀNG</p>

          <div className="w-full mt-6 mx-auto">
            {products !== null &&
              products.map((value: any) => (
                <>
                  <div className="w-full my-1 h-[1px] bg-black"></div>
                  <div key={uuidv4()} className="flex items-center my-4">
                    <div className="w-3/5 flex items-center">
                      <img
                        src={`data:image/png;base64,${value.image}`}
                        className="w-2/6"
                      />
                      <p className="ml-4 ">{value.name}</p>
                    </div>
                    <div className="flex justify-between w-2/5 text-center">
                      <p>{value.amount}</p>
                      <p>{convertMoneyToVND(value.price * value.amount)}</p>
                    </div>
                  </div>
                </>
              ))}
          </div>

          <div className="w-full my-1 h-[1px] bg-black"></div>
          <p className="font-semibold">Vận chuyển</p>
          <p className="ml-10">Giao hàng tận nơi</p>
          <div className="w-full my-1 h-[1px] bg-black"></div>
          <p className="font-semibold">Phương thức thanh toán</p>
          <p className="ml-10">Thanh toán khi giao hàng</p>
          <div className="w-full my-1 h-[1px] bg-black"></div>

          <span className="hidden">
            {products.map(
              (value: any) => (totalMoney += value.price * value.amount)
            )}
          </span>

          <div className="flex justify-between">
            <p className="font-semibold">Tổng tiền sản phẩm :</p>
            <p>{convertMoneyToVND(totalMoney)}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
