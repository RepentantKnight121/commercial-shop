import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type ProductDetail = {
  handleProductId: (value: string) => void;
};

async function getApiCategory(limit: number, page: number): Promise<Object[]> {
  try {
    const response: AxiosResponse<any, any> = await axios.get(
      `http://localhost:4505/api/category?limit=${limit}&page=${page}`
    );
    return response.data;
  } catch (error) {
    return [{ message: "Can't get data" }];
  }
}

async function getApiProduct(
  limit: number,
  page: number,
  category: string,
  price: string,
  search: string
): Promise<Object[]> {
  try {
    let apistring: string;
    if (category === "") {
      apistring = `http://localhost:4505/api/productwithimage?limit=${limit}&page=${page}&price=${price}`;
      if (search !== "") {
        apistring = `http://localhost:4505/api/productwithimage?limit=${limit}&page=${page}&price=${price}&search=${search}`;
      }
    } else {
      apistring = `http://localhost:4505/api/productwithimage?limit=${limit}&page=${page}&price=${price}&category=${category}`;
      if (search !== "") {
        apistring = `http://localhost:4505/api/productwithimage?limit=${limit}&page=${page}&price=${price}&category=${category}&search=${search}`;
      }
    }
    const response: AxiosResponse<any, any> = await axios.get(apistring);
    return response.data;
  } catch (error) {
    return [{ message: "Can't get data" }];
  }
}

function ProductShowcase(props: ProductDetail): JSX.Element {
  let productshowcase: JSX.Element = <></>

  // State to store the API data
  const [categories, setCategories] = useState<Object[]>([])
  const [productwithimages, setProductWithImages] = useState<Object[]>([])

  const [limit, setLimit] = useState<number>(12)
  const [page, setPage] = useState<number>(1)
  const [category, setCategory] = useState<string>("")
  const [price, setPrice] = useState<string>("asc")
  const [search, setSearch] = useState<string>("")

  const convertMoneyToVND = (money: number) => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND"
  }

  const handleCategoryChange = async (newCategory: string) => {
    setCategory(newCategory)
    const data = await getApiProduct(limit, page, newCategory, price, search)
    setProductWithImages(data)
  }
  const handleProductId = (value: string) => {
    props.handleProductId(value)
  }
  const handleAddCart = async (value: any) => {
    value.amount = 1
    localStorage.setItem(`${value.id}`, JSON.stringify(value))
  }

  // UseEffect hook to fetch the API data
  useEffect(() => {
    (async () => {
      let data = await getApiCategory(limit, 1)
      setCategories(data)
      data = await getApiProduct(limit, page, category, price, search)
      setProductWithImages(data)
      console.log(productwithimages)
    })()
  }, [category, page, price])

  productshowcase = (
    <div className="flex my-20">
      <div className="w-2/12 ml-[5%]">
        <h1 className="text-center text-2xl">Phân loại sản phẩm</h1>
        <div className="py-4">
          <p
            className={
              "py-1 text-center hover:cursor-pointer " +
              (category === "" ? "text-sky-400" : "")
            }
            onClick={() => handleCategoryChange("")}>
            Tất cả
          </p>
          {categories === null ? (
            <p className="text-center">Không có thông tin</p>
          ) : (
            categories.map((value: any) => {
              return (
                <p
                  key={uuidv4()}
                  className={
                    "py-1 text-center hover:cursor-pointer " +
                    (category === `${value.id.toString()}`
                      ? "text-sky-400"
                      : "")
                  }
                  onClick={() => {
                    handleCategoryChange(value.id.toString());
                  }}>
                  {value.name}
                </p>
              );
            })
          )}
        </div>
        <h1 className="text-center text-2xl">Giá tiền</h1>
        <div>
          <p
            className={
              "py-1 text-center hover:cursor-pointer " +
              (price === "asc" ? "text-sky-400" : "")
            }
            onClick={() => setPrice("asc")}>
            Thấp đến cao
          </p>
          <p
            className={
              "py-1 text-center hover:cursor-pointer " +
              (price === "desc" ? "text-sky-400" : "")
            }
            onClick={() => setPrice("desc")}>
            Cao đến thấp
          </p>
        </div>
      </div>
      <div className="w-10/12">
        <h1 className="text-center pl-14 text-6xl">Sản phẩm</h1>
        <div className="w-1/12 mx-auto my-5 flex">
          <button
            type="button"
            className="py-1 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              if (page <= 1) {
                setPage(1);
              } else {
                setPage(page - 1);
              }
            }}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <p className="mx-2 py-2 text-2xl text-center">{page}</p>
          <button
            type="button"
            className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              setPage(page + 1);
            }}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="w-10/12 mx-auto">
          <div className="grid grid-cols-4 gap-y-8">
            {productwithimages === null ? (
              <div className="w-full text-center">Không có thông tin</div>
            ) : (
              productwithimages.map((value: any) => {
                return (
                  <div
                    key={uuidv4()}
                    className="mx-5 bg-white flex flex-col relative">
                    <img
                      src={`data:image/png;base64,${value.image}`}
                      alt="Not found"
                    />
                    <h2 className="mt-8 font-medium text-center">
                      {value.name}
                    </h2>
                    <p className="my-2 text-center">
                      {convertMoneyToVND(value.price)}
                    </p>
                    <button
                      className="py-2 px-4 bg-sky-400 text-white"
                      onClick={() => handleAddCart(value)}>
                      Thêm vào giỏ hàng
                    </button>
                    <p
                      className="my-2 text-center hover:cursor-pointer"
                      onClick={() => handleProductId(value.id)}>
                      Xem chi tiết
                    </p>
                    {value.amount === 0 ? (
                      <div className="absolute text-xl flex justify-center text-white items-center top-1/4 left-1/4 right-1/4">
                        <p>HẾT HÀNG</p>
                      </div>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return productshowcase;
}

export default ProductShowcase;
