import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
type ProductDetail = {
  productid: string;
};

async function getApiProduct(id: string): Promise<Object[]> {
  try {
    const response = await axios.get(`http://localhost:4505/api/product/${id}`);
    return response.data;
  } catch (error) {
    return [{ message: "Can't get data" }];
  }
}

async function getApiProductImage(id: string): Promise<Object[]> {
  try {
    const response = await axios.get(
      `http://localhost:4505/api/product-image?productid=${id}&nopagelimit=true`
    );
    return response.data;
  } catch (error) {
    return [{ message: "Can't get data" }];
  }
}

export default function ProductDetail(props: ProductDetail) {
  const [product, setProduct] = useState<Object[]>();
  const [productimage, setProductImage] = useState<ProductDetail[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [ArrayProps, setArrayProps]: any[] = useState([]);
  const [arraySize, setArraySize] = useState([]);
  // UseEffect hook to fetch the API data
  useEffect(() => {
    (async () => {
      const productData = await getApiProduct(props.productid);
      setProduct(productData);
      const productImageData: any = await getApiProductImage(props.productid);
      setProductImage(productImageData);

      let x: any;
      let product: any = productData[0];
      for (x in product) {
        ArrayProps.push(product[x]);
        setArrayProps[ArrayProps];
      }

      console.log(ArrayProps);
      let arrSize = ArrayProps[5].split("");
      console.log(arrSize);
      setArraySize(arrSize);
    })();
  }, []);

  if (!product) {
    return <div className="text-center text-7xl">Loading...</div>;
  }

  return (
    <div>
      <div className="hover:cursor-pointer flex items-center underline underline-offset-2 ml-14 mt-10">
        <FontAwesomeIcon icon={faChevronLeft} />
        <a className="" href="/product">
          Quay về
        </a>
      </div>
      <div className="flex mt-10 w-10/12 mx-auto">
        <div className="flex w-1/2 flex-col-reverse">
          <ul className="flex mx-auto">
            {productimage.map((value: any, index) => (
              <li key={index}>
                <img
                  src={`data:image/png;base64,${value.image}`}
                  onClick={() => setActiveImageIndex(index)}
                  alt="Img item"
                  className="h-28 mx-3 active:border-solid active:border-2 active:border-black"
                />
              </li>
            ))}
          </ul>

          <img
            className="w-80 h-auto mx-auto mb-10"
            src={`data:image/png;base64,${
              productimage.at(activeImageIndex)?.image
              // ? operator optional chaining để truy cập bất kỳ thuộc tính nào của một đối tượng,
              // bất kể đối tượng đó tồn tại hay không
            }`}
            alt="Img Main"
          />
        </div>

        <div className="w-28"></div>

        {/* Space Descript Product*/}
        <div className="w-2/5 mx-auto flex flex-col">
          <p className="text-center text-2xl">{`${ArrayProps[2]}`}</p>

          <div className="w-full flex">
            {arraySize.map((value: string) => (
              <button
                //onClick={() => setSizeSelected(value)}
                className="px-8 mx-2 py-2 rounded-md  border border-solid border-gray-400  hover:border-black">
                {`${value}`}
              </button>
            ))}
          </div>

          <h1 className="p-4 text-center text-3xl text-white">
            Quản lý thông tin
          </h1>

          <button className="w-full  my-2  border border-solid border-black  py-3 mx-auto ">
            Thêm vào giỏ hàng
          </button>
          <button className="w-full bg-black text-white py-3 mx-auto ">
            Mua ngay
          </button>
        </div>
      </div>

      <p className="text-center mt-28 text-4xl">SẢN PHẨM KHÁC</p>

      <div className="w-10/12 mx-auto">
        <div className="grid grid-cols-4 gap-y-8">
          {productimage === null ? (
            <div className="w-full text-center">Không có thông tin</div>
          ) : (
            productimage.slice(0, 4).map((value: any) => {
              return (
                <div key={uuidv4()} className="mx-5 bg-white flex">
                  <img src={`data:image/png;base64,${value.image}`} />
                  <h2 className="mt-8 font-medium text-center">{value.name}</h2>
                  <p className="font-semibold text-center">{value.price}</p>

                  {/* <p
                    className="text-center"
                    onClick={() => handleProductId(value.id)}>
                    Xem chi tiết
                  </p> */}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
