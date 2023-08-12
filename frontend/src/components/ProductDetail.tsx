import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { API_URL } from "../utils/URL";

type ProductProps = {
  productid: string;
};

type ProductObject = {
  id: string;
  categoryId: string;
  name: string;
  fabric: string;
  price: number;
  description: string;
};

type ProductDetailObject = {
  id: string;
  productId: string;
  color: string;
  size: string;
  amount: number;
};

type ProductCartObject = {
  name: string;
  image: any;
  id: string;
  price: number;
  amount: number;
};

async function getApiProduct(id: string): Promise<ProductObject | undefined> {
  try {
    const response = await axios.get(`${API_URL}/product/${id}`);
    return response.data[0];
  } catch (error) {
    return undefined;
  }
}

async function getApiProductDetail(
  id: string
): Promise<ProductDetailObject[] | undefined> {
  try {
    const response = await axios.get(
      `${API_URL}/product-detail?productid=${id}`
    );
    return response.data;
  } catch (error) {
    return undefined;
  }
}

async function getApiProductImage(id: string): Promise<Object[]> {
  try {
    const response = await axios.get(
      `${API_URL}/product-image?productid=${id}&nopagelimit=true`
    );
    return response.data;
  } catch (error) {
    return [{ message: "Can't get data" }];
  }
}

const convertMoneyToVND = (money: number) => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};

export default function ProductDetail(props: ProductProps) {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductObject | undefined>();
  const [productdetail, setProductdetail] = useState<
    ProductDetailObject[] | undefined
  >([]);
  const [productcolor, setProductColor] = useState<string[]>([]);
  const [productimage, setProductImage] = useState<any[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeSize, setActiveSize] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);

  const handleAddCart = async (
    productname: string,
    productimage: any,
    productdetailid: string,
    productdetailprice: number,
    productdetailamount: number
  ) => {
    productdetailamount = amount;
    const data: ProductCartObject = {
      name: productname,
      image: productimage,
      id: productdetailid,
      price: productdetailprice,
      amount: productdetailamount,
    };
    localStorage.setItem(`${productdetailid}`, JSON.stringify(data));
    alert("Thêm giỏ hàng thành công!");
  };

  const handleBuyNow = async (
    productname: string,
    productimage: any,
    productdetailid: string,
    productdetailprice: number,
    productdetailamount: number
  ) => {
    localStorage.clear();
    productdetailamount = amount;
    const data: ProductCartObject = {
      name: productname,
      image: productimage,
      id: productdetailid,
      price: productdetailprice,
      amount: productdetailamount,
    };
    localStorage.setItem(`${productdetailid}`, JSON.stringify(data));
    navigate("/cart");
  };

  // UseEffect hook to fetch the API datas
  useEffect(() => {
    const fecthData = async () => {
      setProductColor([]);

      const productData: ProductObject | undefined = await getApiProduct(
        props.productid
      );
      if (productData) {
        setProduct(productData);
      }
      const productdetailData: ProductDetailObject[] | undefined =
        await getApiProductDetail(props.productid);
      if (productdetailData) {
        setProductdetail(productdetailData);

        // Get unique color and set it to state
        const uniqueColors = Array.from(
          new Set(
            productdetailData.map((item: ProductDetailObject) => item.color)
          )
        );
        setProductColor(uniqueColors);

        // Set activeColor to the first values in uniqueColors
        if (uniqueColors.length > 0) {
          setActiveColor(uniqueColors[0]);
        }

        // Find the first matching size for the active color
        const firstMatchingSize = productdetailData.find(
          (item) => item.color === uniqueColors[0]
        )?.size;
        if (firstMatchingSize) {
          setActiveSize(firstMatchingSize);
        }
      }

      const productImageData: any = await getApiProductImage(props.productid);
      setProductImage(productImageData);
    };

    fecthData();
  }, []);

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
              <li key={uuidv4()}>
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
            }`}
            alt="Img Main"
          />
        </div>

        <div className="w-28"></div>

        {/* Space Descript Product*/}
        <div className="w-2/5 mx-auto flex flex-col">
          {product ? (
            <>
              <p className="text-center font-semibold text-2xl mb-4">
                {product.name}
              </p>
              <p className="font-semibold">
                Giá:{" "}
                <span className="font-normal">
                  {" "}
                  {convertMoneyToVND(product.price)}{" "}
                </span>
              </p>
              <p className="font-semibold my-2">
                {" "}
                Chất liệu :{" "}
                <span className="font-normal"> {product.fabric}</span>
              </p>
              <p className="font-semibold">
                {" "}
                Mô tả :{" "}
                <span className="font-normal">Chất liệu {product.fabric}</span>
              </p>
            </>
          ) : (
            <p>Không có dữ liệu</p>
          )}

          <div className="flex my-4">
            {productcolor ? (
              productcolor.map((value: string) => (
                <p
                  key={uuidv4()}
                  className={`py-2 px-8 text-center bg-blue-light mr-4 ${
                    activeColor === value ? "border-2 border-black" : ""
                  }`}
                  onClick={() => {
                    setActiveColor(value);
                    const firstMatchingSize = productdetail?.find(
                      (item: ProductDetailObject) => item.color === value
                    )?.size;
                    if (firstMatchingSize) {
                      setActiveSize(firstMatchingSize);
                    }
                  }}>
                  {value}
                </p>
              ))
            ) : (
              <p>Không có dữ liệu</p>
            )}
          </div>

          <div className="flex mr-2">
            {productdetail ? (
              productdetail.map((value: ProductDetailObject) => {
                if (value.color === activeColor) {
                  return (
                    <p
                      key={uuidv4()}
                      className={`py-2 px-8 text-center border-2 bg-grey-light mr-4 ${
                        activeSize === value.size
                          ? " border-2 border-black "
                          : ""
                      }`}
                      onClick={() => setActiveSize(value.size)}>
                      {value.size}
                    </p>
                  );
                }
                return null;
              })
            ) : (
              <p>Không có dữ liệu</p>
            )}
          </div>

          {productcolor && productdetail ? (
            productdetail.map((value: ProductDetailObject) => {
              if (activeColor === value.color && activeSize === value.size) {
                return (
                  <div>
                    <p className="font-semibold my-4" key={uuidv4()}>
                      Số lượng tồn kho :{" "}
                      <span className="font-normal">{value.amount}</span>
                    </p>
                  </div>
                );
              }

              return null;
            })
          ) : (
            <p>Không có dữ liệu</p>
          )}

          <p>
            Số lượng mua :
            <input
              className="mb-4 ml-2 pl-2"
              type="number"
              value={amount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (parseInt(event.target.value) < 1) {
                  setAmount(1);
                  event.target.value = "1";
                } else if (parseInt(event.target.value) > 10) {
                  setAmount(10);
                  event.target.value = "10";
                } else setAmount(parseInt(event.target.value));
              }}></input>
          </p>

          <button
            className="w-full  my-2  border border-solid border-black  py-3 mx-auto"
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();

              // Find the productdetailid based on the selected color and size
              const selectedProductDetail = productdetail?.find(
                (item: ProductDetailObject) =>
                  item.color === activeColor && item.size === activeSize
              );

              if (selectedProductDetail) {
                // Use the selectedProductDetail to proceed with your purchase logic
                // For example, you can call the handleAddCart function with the selectedProductDetail
                if (product) {
                  handleAddCart(
                    product.name,
                    productimage.at(activeImageIndex)?.image,
                    selectedProductDetail.id,
                    product.price,
                    selectedProductDetail.amount
                  );
                }
              }
            }}>
            Thêm vào giỏ hàng
          </button>
          <button
            className="w-full bg-black text-white py-3 mx-auto"
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              event.preventDefault();

              // Find the productdetailid based on the selected color and size
              const selectedProductDetail = productdetail?.find(
                (item: ProductDetailObject) =>
                  item.color === activeColor && item.size === activeSize
              );

              if (selectedProductDetail) {
                // Use the selectedProductDetail to proceed with your purchase logic
                // For example, you can call the handleBuyNow function with the selectedProductDetail
                if (product) {
                  handleBuyNow(
                    product.name,
                    productimage.at(activeImageIndex)?.image,
                    selectedProductDetail.id,
                    product.price,
                    selectedProductDetail.amount
                  );
                }
              }
            }}>
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
