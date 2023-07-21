import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import AddingForm from "./AddForm"
import RemoveForm from "./RemoveForm"
import EditForm from "./EditForm"

type Display = {
  display: string
  limit: number
  page: number
}

function AdminDisplay(props: Display): JSX.Element {
  const [addForm, setAddForm] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<boolean>(false)
  const [removeForm, setRemoveForm] = useState<boolean>(false)
  const [data, setData] = useState<Object[]>([])

  const handleAddForm = (value: boolean) => {
    setAddForm(value)
  }
  const handleEditForm = (value: boolean) => {
    setEditForm(value)
  }
  const handleRemoveForm = (value: boolean) => {
    setRemoveForm(value)
  }

  // Get API function
  async function getApi(name: string): Promise<Object[]> {
    try {
      const response = await axios.get(`http://localhost:4505/api/${name}?limit=${props.limit}&page=${props.page}`)
      return response.data
    } catch (error) {
      return [{ message: "Can't get data" }]
    }
  }

  useEffect(() => {
    if (props.display === "account") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
    } else if (props.display === "account-role") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
    } else if (props.display === "bill-info") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
    } else if (props.display === "bill-detail") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
    } else if (props.display === "bill-status") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
    } else if (props.display === "category") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
    } else if (props.display === "customer") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
    } else if (props.display === "discount") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
    } else if (props.display === "product") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
    } else if (props.display === "product-image") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
    }
  }, [props.display])

  let page: JSX.Element

  if (props.display === "account") {
    page = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý tài khoản</h1>
        <table className="">
          <thead>
            <tr>
              <th>Index</th>
              <th>Username</th>
              <th>RoleId</th>
              <th>Password</th>
              <th>Display name</th>
              <th>Email</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value: any, index: number) => (
            <tr key={uuidv4()}>
              <td>{index}</td>
              <td>{value.username}</td>
              <td>{value.roleId}</td>
              <td>{value.password}</td>
              <td>{value.displayName}</td>
              <td>{value.email}</td>
              <td>{value.active}</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
          <tr>
              <th>Index</th>
              <th>Username</th>
              <th>RoleId</th>
              <th>Password</th>
              <th>Display name</th>
              <th>Email</th>
              <th>Active</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else if (props.display === "account-role") {
    page = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý loại tài khoản</h1>
        <div>
          <button type="button" onClick={() => {setAddForm(true)}} className="py-2 px-4 justify-end bg-green-500 text-2xl text-white">+</button>
          { addForm && <AddingForm display={props.display} handleAddForm={handleAddForm} /> }
        </div>
        <div className="w-1/12 mx-auto my-5 flex">
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"><FontAwesomeIcon icon={faChevronLeft} /></button>
          <p className="mx-2 py-2 text-2xl text-center">{props.page}</p>
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
        <table className="mx-auto w-11/12">
          <thead className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Description</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value: any) => (
            <tr className="text-center" key={uuidv4()}>
              <td className="border-2 border-black">{value.id}</td>
              <td className="border-2 border-black">{value.description}</td>
              <td className="w-1/12 border-2 border-black">
                <button type="button" onClick={() => {setEditForm(true)}} className="py-2 px-4 my-2 justify-end bg-blue-500 text-xl text-white">#</button>
                {editForm && <EditForm display={props.display} value={value.id} handleEditForm={handleEditForm} />}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button type="button" onClick={() => {setRemoveForm(true)}} className="py-2 px-4 my-2 justify-end bg-red-500 text-xl text-white">-</button>
                {removeForm && <RemoveForm display={props.display} value={value.id} handleRemoveForm={handleRemoveForm} />}
              </td>
            </tr>
          ))}
          </tbody>
          <tfoot className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Description</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else if (props.display === "bill-info") {
    page = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý hóa đơn</h1>
        <table className="">
          <thead>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Customer Id</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value: any, index: number) => (
            <tr key={uuidv4()}>
              <td>{index+1}</td>
              <td>{value.id}</td>
              <td>{value.customerId}</td>
              <td>{value.date}</td>
              <td>{value.status}</td>
              <td>{value.payment}</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Customer Id</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else if (props.display === "bill-detail") {
    page = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý hóa đơn chi tiết</h1>
        <table className="">
          <thead>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Bill Id</th>
              <th>Product Id</th>
              <th>Discount Id</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value: any, index: number) => (
            <tr key={uuidv4()}>
              <td>{index+1}</td>
              <td>{value.id}</td>
              <td>{value.billId}</td>
              <td>{value.productId}</td>
              <td>{value.discountId}</td>
              <td>{value.amount}</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Bill Id</th>
              <th>Product Id</th>
              <th>Discount Id</th>
              <th>Amount</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else if (props.display === "bill-status") {
    page = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý trạng thái hóa đơn</h1>
        <table className="">
          <thead>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value: any, index: number) => (
            <tr key={uuidv4()}>
              <td>{index+1}</td>
              <td>{value.id}</td>
              <td>{value.description}</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Description</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else if (props.display === "category") {
    page = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý loại sản phẩm</h1>
        <table className="">
          <thead>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value: any, index: number) => (
            <tr key={uuidv4()}>
              <td>{index+1}</td>
              <td>{value.id}</td>
              <td>{value.name}</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  } else if (props.display === "customer") {
    page = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý khách hàng</h1>
        <table className="">
          <thead>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Account Username</th>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value: any, index: number) => (
            <tr key={uuidv4()}>
              <td>{index+1}</td>
              <td>{value.id}</td>
              <td>{value.accountUsername}</td>
              <td>{value.name}</td>
              <td>{value.phone}</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Index</th>
              <th>Account Username</th>
              <th>Id</th>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  } else if (props.display === "discount") {
    page = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý giảm giá</h1>
        <table className="">
          <thead>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Description</th>
              <th>Percent</th>
              <th>Date Start</th>
              <th>Date End</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value: any, index: number) => (
            <tr key={uuidv4()}>
              <td>{index+1}</td>
              <td>{value.id}</td>
              <td>{value.description}</td>
              <td>{value.percent}</td>
              <td>{value.dateStart}</td>
              <td>{value.dateEnd}</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Description</th>
              <th>Percent</th>
              <th>Date Start</th>
              <th>Date End</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  } else if (props.display === "product") {
    page = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý sản phẩm</h1>
        <table className="">
          <thead>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Category Id</th>
              <th>Name</th>
              <th>Color</th>
              <th>Fabric</th>
              <th>Size</th>
              <th>Form</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value: any, index: number) => (
            <tr key={uuidv4()}>
              <td>{index+1}</td>
              <td>{value.id}</td>
              <th>{value.idCategory}</th>
              <td>{value.name}</td>
              <td>{value.color}</td>
              <td>{value.fabric}</td>
              <td>{value.size}</td>
              <td>{value.form}</td>
              <td>{value.price}</td>
              <td>{value.amount}</td>
              <td>{value.description}</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Category Id</th>
              <th>Name</th>
              <th>Color</th>
              <th>Fabric</th>
              <th>Size</th>
              <th>Form</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else if (props.display === "product-image") {
    page = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý hình ảnh sản phẩm</h1>
        <table className="">
          <thead>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Product Id</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
          {data.map((value: any, index: number) => (
            <tr key={uuidv4()}>
              <td>{index+1}</td>
              <td>{value.id}</td>
              <td>{value.productId}</td>
              <td>{value.image}</td>
            </tr>
          ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Product Id</th>
              <th>Image</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else {
    page = <div className="text-center">Không có thông tin</div>
  }

  return page
}

export default AdminDisplay;
