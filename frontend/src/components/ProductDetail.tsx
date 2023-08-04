import axios from "axios"
import { useEffect, useState } from "react"

type ProductDetail = {
  productid: string
}

async function getApiProduct(id: string): Promise<Object> {
  try {
    const response = await axios.get(`http://localhost:4505/api/product/${id}`)
    return response.data
  } catch (error) {
    return [{ message: "Can't get data" }]
  }
}

async function getApiProductImage(id: string): Promise<Object[]> {
  try {
    const response = await axios.get(`http://localhost:4505/api/product-image?productid=${id}&nopagelimit=true`)
    return response.data
  } catch (error) {
    return [{ message: "Can't get data" }]
  }
}

export default function ProductDetail(props: ProductDetail) {
  const [product, setProduct] = useState<Object | undefined>()
  const [productimage, setProductImage] = useState<Object[] | undefined>([])

  // UseEffect hook to fetch the API data
  useEffect(() => {
    (async () => {
      const productData = await getApiProduct(props.productid)
      setProduct(productData)
      const productImageData = await getApiProductImage(props.productid)
      setProductImage(productImageData)
    })();

  }, [])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
      </div>
      <div>
        <h1>Chi tiết sản phẩm</h1>
      </div>
    </div>
  )
}