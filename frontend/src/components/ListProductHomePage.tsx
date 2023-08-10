import axios, { AxiosResponse } from "axios"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"

type ProductDetail = {
  handleProductId: (value: string) => void
}

async function getApiProduct(
  limit: number,
  page: number,
  price: string,
  search: string
): Promise<Object[]> {
  try {
    let apistring: string
    apistring = `http://localhost:4505/api/productwithimage?limit=${limit}&page=${page}&price=${price}`
    if (search !== "") {
      apistring = `http://localhost:4505/api/productwithimage?limit=${limit}&page=${page}&price=${price}&search=${search}`
    }
    const response: AxiosResponse<any, any> = await axios.get(apistring)
    return response.data
  } catch (error) {
    return [{ message: "Can't get data" }]
  }
}

function ProductShowcase(props: ProductDetail): JSX.Element {
  let productshowcase: JSX.Element = <></>

  // State to store the API data
  const [productwithimages, setProductWithImages] = useState<Object[]>([])

  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [price, setPrice] = useState<string>("asc")
  const [search, setSearch] = useState<string>("")

  const convertMoneyToVND = (money: number) => {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ"
  }

  const handleProductId = (value: string) => {
    props.handleProductId(value)
  }

  // UseEffect hook to fetch the API data
  useEffect(() => {
    (async () => {
      const data = await getApiProduct(limit, page, price, search)
      setProductWithImages(data)
    })()
  }, [page, price])

  productshowcase = (
    <div className="w-10/12 mx-auto my-20">
      <div className="grid grid-cols-4 gap-8">
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

                <h2 className="mt-8 font-semibold text-center">{value.name}</h2>
                <p className="my-2 text-center">
                  {convertMoneyToVND(value.price)}
                </p>
                <a
                  href=""
                  className="my-2 text-center"
                  onClick={() => handleProductId(value.id)}>
                  Xem chi tiết
                </a>
              </div>
            )
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
  )

  return productshowcase
}

export default ProductShowcase
