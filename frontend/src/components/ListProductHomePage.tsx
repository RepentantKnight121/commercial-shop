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
  let productshowcase: JSX.Element = <></>;

  // State to store the API data
  const [categories, setCategories] = useState<Object[]>([]);
  const [productwithimages, setProductWithImages] = useState<Object[]>([]);

  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("asc");
  const [search, setSearch] = useState<string>("");

  const handleCategoryChange = async (newCategory: string) => {
    setCategory(newCategory);
    const data = await getApiProduct(limit, page, newCategory, price, search);
    setProductWithImages(data);
  };
  const handleProductId = (value: string) => {
    props.handleProductId(value);
  };
  const handleAddCart = async (value: any) => {
    value.amount = 1;
    localStorage.setItem(`${value.id}`, JSON.stringify(value));
  };

  // UseEffect hook to fetch the API data
  useEffect(() => {
    (async () => {
      let data = await getApiCategory(limit, 1);
      setCategories(data);
      data = await getApiProduct(limit, page, category, price, search);
      setProductWithImages(data);
    })();
  }, [category, page, price]);

  productshowcase = (
    <div className="w-10/12 mx-auto my-20">
      <div className="grid grid-cols-4 gap-y-8">
        {productwithimages === null ? (
          <div className="w-full text-center">Không có thông tin</div>
        ) : (
          productwithimages.slice(0, 8).map((value: any) => {
            return (
              <div key={uuidv4()} className="mx-5bg-white flex flex-col">
                <img
                  className=""
                  src={`data:image/png;base64,${value.image}`}
                  alt="Not found"
                />

                <h2 className="mt-8 font-medium text-center">{value.name}</h2>
                <p className="text-center">{value.categoryId}</p>
                <p className="font-semibold text-center">{value.price}</p>
              </div>
            );
          })
        )}
      </div>
      <div className="w-full mx-auto flex justify-center">
        <a
          href="/product"
          className="mt-5  underline underline-offset-2 px-3 py-3 bg-grey-light">
          Xem thêm
        </a>
      </div>
    </div>
  );

  return productshowcase;
}

export default ProductShowcase;
