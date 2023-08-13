import Menu from "../components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
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

function About(): JSX.Element {
  const [refresh, setRefresh] = useState<boolean>(false);

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);

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

      {/* main content */}
      <div className="w-4/5 my-10 mx-auto">
        <h1 className="text-4xl font-semibold text-center ">
          Highlight - Nâng Tầm Phong Cách Trẻ
        </h1>
        <p className="mt-10 text-lg">
          {" "}
          Đánh thức phong cách trẻ trung và hiện đại, Highlight tự hào là thương
          hiệu thời trang hàng đầu dành riêng cho giới trẻ. Chúng tôi tập trung
          vào việc đem đến những bộ trang phục đầy sự sáng tạo, mang tính biểu
          tượng và thể hiện cá tính riêng của bạn.
        </p>
        <div className="flex mt-10 w-full mx-auto justify-center">
          <iframe
            className="mr-28"
            width="326"
            height="579"
            src="https://www.youtube.com/embed/3n2R4sDPnL8"
            title="Nộp Phan #highlighthehe #davidnop #funny #fashion"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
          <iframe
            className="ml-28"
            width="326"
            height="579"
            src="https://www.youtube.com/embed/lylnWo_Yd9k"
            title="Nộp Vauu #highlighthehe #davidnop #funny #fashion"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
        </div>
        <p className="mt-10 text-lg">
          Với mục tiêu đổi mới và tạo nên sự khác biệt trong thế giới thời
          trang, chúng tôi không ngừng tìm kiếm những ý tưởng thiết kế độc đáo
          và đột phá. Chất lượng là tôn chỉ hàng đầu của chúng tôi, từ việc chọn
          nguyên liệu, cắt may tinh tế đến việc hoàn thiện từng sản phẩm
        </p>
        <p className="mt-10 text-lg">
          Sản phẩm Highlight không chỉ đơn thuần là trang phục, mà là biểu tượng
          thể hiện phong cách cá nhân và tinh thần tự do. Chúng tôi tự tin rằng
          mỗi sản phẩm sẽ mang lại sự tự tin và thăng hoa cho bạn, giúp bạn nổi
          bật trong từng khoảnh khắc.
        </p>
        <p className="mt-10 text-lg">
          Không ngừng sáng tạo và cải tiến, Highlight luôn đồng hành cùng bạn
          trên hành trình khám phá vẻ đẹp mới. Hãy cùng chúng tôi thể hiện tinh
          thần trẻ trung và đam mê qua những bộ trang phục tuyệt đẹp. Sẵn sàng
          "highlight" cuộc sống của bạn bằng phong cách độc đáo từ Highlight!
        </p>

        <h3 className="mt-10 mb-4 font-semibold text-2xl text-center">
          Cảm ơn bạn đã biết đến chúng tôi
        </h3>
        <h4 className="text-center text-lg">
          Tấu hề là chính , bán hàng là phụ !
        </h4>
      </div>
    </div>
  );
}

export default About;
