import axios from "axios"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import { API_URL } from "../utils/URL"

type ProductProps = {
  productid: string
}

type ProductObject = {
  id: string
  categoryId: string
  name: string
  fabric: string
  price: number
  description: string
}

type ProductAmountObject = {
  amount: number
}

type ProductColorObject = {
  color: string
}

type ProductSizeObject = {
  size: string
}

async function getApiProduct(id: string): Promise<ProductObject | undefined> {
  try {
    const response = await axios.get(`${API_URL}/product/${id}`)
    return response.data[0]
  } catch (error) {
    return undefined
  }
}

async function getApiProductDetailAmount(id: string, color: string, size: string): Promise<ProductAmountObject | undefined> {
  try {
    const response = await axios.get(`${API_URL}/product-detail/amount?productid=${id}&color=${color}&size=${size}`)
    return response.data[0]
  } catch (error) {
    return undefined
  }
}

async function getApiProductDetailColor(id: string): Promise<ProductColorObject[] | undefined> {
  try {
    const response = await axios.get(`${API_URL}/product-detail/onlycolororsize?productid=${id}&color=true`)
    return response.data
  } catch (error) {
    return undefined
  }
}

async function getApiProductDetailSize(id: string): Promise<ProductSizeObject[] | undefined> {
  try {
    const response = await axios.get(`${API_URL}/product-detail/onlycolororsize?productid=${id}&size=true`)
    return response.data
  } catch (error) {
    return undefined
  }
}

async function getApiProductImage(id: string): Promise<Object[]> {
  try {
    const response = await axios.get(
      `${API_URL}/product-image?productid=${id}&nopagelimit=true`
    )
    return response.data
  } catch (error) {
    return [{ message: "Can't get data" }]
  }
}

export default function ProductDetail(props: ProductProps) {
  const [product, setProduct] = useState<ProductObject | undefined>()
  const [productcolor, setProductcolor] = useState<ProductColorObject[] | undefined>()
  const [productsize, setProductsize] = useState<ProductSizeObject[] | undefined>()
  const [productamount, setProductamount] = useState<ProductAmountObject | undefined>()
  const [productimage, setProductImage] = useState<any[]>([])
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [activeColor, setActiveColor] = useState<string>("")
  const [activeSize, setActiveSize] = useState<string>("")

  const handleAddCart = async (value: any) => {
    value.amount = 1
    localStorage.setItem(`${value.id}`, JSON.stringify(value))
  }

  // UseEffect hook to fetch the API datas
  useEffect(() => {
    const fecthData = async () => {
      const productData: ProductObject | undefined = await getApiProduct(props.productid)
      if (productData) {
        setProduct(productData)
      }
      const productColorData: ProductColorObject[] | undefined = await getApiProductDetailColor(props.productid)
      if (productColorData) {
        setProductcolor(productColorData)
        setActiveColor(productColorData[0].color)
      }
      const productSizeData: ProductSizeObject[] | undefined = await getApiProductDetailSize(props.productid)
      if (productSizeData) {
        setProductsize(productSizeData)
        setActiveSize(productSizeData[0].size)
      }
      if (productColorData && productSizeData) {
        const productAmount: ProductAmountObject | undefined = await getApiProductDetailAmount(props.productid, productColorData[0].color, productSizeData[0].size)
        setProductamount(productAmount)
      }
      
      const productImageData: any = await getApiProductImage(props.productid)
      setProductImage(productImageData)
    }

    fecthData()
  }, [activeColor, activeSize])

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
            src={`data:image/png;base64,${productimage.at(activeImageIndex)?.image}`}
            alt="Img Main"
          />
        </div>

        <div className="w-28"></div>

        {/* Space Descript Product*/}
        <div className="w-2/5 mx-auto flex flex-col">
          {product ?
            (
            <>
            <p>{product.name}</p>
            <p>Giá: {product.price}</p>
            <p>Chất liệu {product.fabric}</p>
            <p>Mô tả: {product.description}</p>
            </>
            )
            :
            <p>Không có dữ liệu</p>
          }

          <div>
            {productcolor ?
              productcolor.map((value: any) => {
                return <p key={uuidv4()} onClick={() => setActiveColor(value.color)}
                          className="hover:cursor-pointer">
                  {value.color}
                </p>
              })
              :
              <p>Không có dữ liệu về màu sắc</p>
            }
          </div>

          <div>
          {productsize ?
            productsize.map((value: any) => {
              return <p key={uuidv4()} onClick={() => setActiveSize(value.size)}
                        className="hover:cursor-pointer">
                {value.size}
              </p>
            })
            :
            <p>Không có dữ liệu về size</p>
          }
          </div>

          {productamount && <p>Số lượng: {productamount.amount}</p>}

          <button className="w-full  my-2  border border-solid border-black  py-3 mx-auto"
            onClick={() => {}}>
            Thêm vào giỏ hàng
          </button>
          <button className="w-full bg-black text-white py-3 mx-auto ">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  )
}
