import { faArrowsRotate, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

import AddForm from "./AddForm"
import RemoveForm from "./RemoveForm"
import EditForm from "./EditForm"

type Display = {
  display: string
  limit: number
  page: number
  setPage: (page: number) => void
}

function AdminDisplay(props: Display): JSX.Element {
  let pageData: JSX.Element = <div></div>
  const [refreshPage, setRefreshPage] = useState<boolean>(false)
  const [addForm, setAddForm] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<any>(null)
  const [removeForm, setRemoveForm] = useState<string>("")
  const [data, setData] = useState<Object[]>([])

  const handleAddForm = (value: boolean) => {
    setAddForm(value)
  }
  const handleEditForm = (value: string) => {
    setEditForm(value)
  }
  const handleRemoveForm = (value: string) => {
    setRemoveForm(value)
  }
  const handlePage = (page: number) => {
    props.setPage(page)
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
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([{ message: "Can't get data" }]);
      })
    } else if (props.display === "account-role") {
      getApi(props.display).then((responseData) => {
        setData(responseData)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData([{ message: "Can't get data" }]);
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
  }, [props.display, props.limit, props.page, refreshPage])

  if (props.display === "account") {
    pageData = (
      <div className="w-[80%]">
        <h1 className="py-5 text-center text-4xl">Quản lý tài khoản</h1>
        <div className="mx-auto w-1/12 flex justify-center">
          <button type="button" onClick={() => {setAddForm(true)}} className="py-2 px-4 justify-end bg-green-500 text-2xl text-white">+</button>
          { addForm && <AddForm display={props.display} handleAddForm={handleAddForm} /> }
        </div>
        <div className="w-1/12 mx-auto my-5 flex">
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              if (props.page <= 1) {
                handlePage(1)
              } else {
                handlePage(props.page - 1)
              }
            }}><FontAwesomeIcon icon={faChevronLeft} /></button>
          <p className="mx-2 py-2 text-2xl text-center">{props.page}</p>
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {handlePage(props.page + 1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
        <table className="mx-auto w-11/12">
          <thead className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Username</th>
              <th className="border-2 border-black">RoleId</th>
              <th className="border-2 border-black">Password</th>
              <th className="border-2 border-black">Display name</th>
              <th className="border-2 border-black">Email</th>
              <th className="border-2 border-black">Active</th>
              <th className="border-2 border-black">Session</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
          { data === null ? (
            <tr>
              <td align="center" colSpan={8} className="border-2 border-black text-center">Không có thông tin</td>
            </tr>
          ) : (data.map((value: any) => (
            <tr className="text-center" key={uuidv4()}>
              <td className="border-2 border-black">{value.username}</td>
              <td className="border-2 border-black">{value.roleId}</td>
              <td className="border-2 border-black">{value.password}</td>
              <td className="border-2 border-black">{value.displayName}</td>
              <td className="border-2 border-black">{value.email}</td>
              <td className="border-2 border-black">{value.active}</td>
              <td className="border-2 border-black">{value.session}</td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setEditForm(value)}
                  className="py-2 px-4 my-2 justify-end bg-blue-500 text-xl text-white">#</button>
                {editForm && (<EditForm display={props.display} value={editForm} handleEditForm={handleEditForm} />)}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setRemoveForm(value.username)}
                  className="py-2 px-4 my-2 justify-end bg-red-500 text-xl text-white">-</button>
                {removeForm && (<RemoveForm display={props.display} value={removeForm} handleRemoveForm={handleRemoveForm} />)}
              </td>
            </tr>
          )))}
          </tbody>
          <tfoot className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Username</th>
              <th className="border-2 border-black">RoleId</th>
              <th className="border-2 border-black">Password</th>
              <th className="border-2 border-black">Display name</th>
              <th className="border-2 border-black">Email</th>
              <th className="border-2 border-black">Active</th>
              <th className="border-2 border-black">Session</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else if (props.display === "account-role") {
    pageData = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý loại tài khoản</h1>
        <div className="mx-auto w-1/12 flex justify-center">
          <button type="button" onClick={() => {setAddForm(true)}} className="py-2 px-4 justify-end bg-green-500 text-2xl text-white">+</button>
          { addForm && <AddForm display={props.display} handleAddForm={handleAddForm} /> }
        </div>
        <div className="w-1/12 mx-auto my-5 flex">
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              if (props.page <= 1) {
                handlePage(1)
              } else {
                handlePage(props.page - 1)
              }
            }}><FontAwesomeIcon icon={faChevronLeft} /></button>
          <p className="mx-2 py-2 text-2xl text-center">{props.page}</p>
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {handlePage(props.page + 1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
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
          {data === null ? (
            <tr>
              <td align="center" colSpan={4} className="border-2 border-black text-center">Không có thông tin</td>
            </tr>
          ) : (
          data.map((value: any) => (
            <tr className="text-center" key={uuidv4()}>
              <td className="border-2 border-black">{value.id}</td>
              <td className="border-2 border-black">{value.description}</td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setEditForm(value)}
                  className="py-2 px-4 my-2 justify-end bg-blue-500 text-xl text-white">#</button>
                {editForm && (<EditForm display={props.display} value={editForm} handleEditForm={handleEditForm} />)}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setRemoveForm(value.id)}
                  className="py-2 px-4 my-2 justify-end bg-red-500 text-xl text-white">-</button>
                {removeForm && (<RemoveForm display={props.display} value={removeForm} handleRemoveForm={handleRemoveForm} />)}
              </td>
            </tr>
          )))}
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
    pageData = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý hóa đơn</h1>
        <div className="mx-auto w-1/12 flex justify-center">
          <button type="button" onClick={() => {setAddForm(true)}} className="py-2 px-4 justify-end bg-green-500 text-2xl text-white">+</button>
          { addForm && <AddForm display={props.display} handleAddForm={handleAddForm} /> }
        </div>
        <div className="w-1/12 mx-auto my-5 flex">
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              if (props.page <= 1) {
                handlePage(1)
              } else {
                handlePage(props.page - 1)
              }
            }}><FontAwesomeIcon icon={faChevronLeft} /></button>
          <p className="mx-2 py-2 text-2xl text-center">{props.page}</p>
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {handlePage(props.page + 1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
        <table className="mx-auto w-11/12">
          <thead className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Customer Id</th>
              <th className="border-2 border-black">Date</th>
              <th className="border-2 border-black">Status</th>
              <th className="border-2 border-black">Payment</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
          { data === null ? (
            <tr>
              <td align="center" colSpan={7} className="border-2 border-black text-center">Không có thông tin</td>
            </tr>
          ) : (data.map((value: any) => (
            <tr className="text-center" key={uuidv4()}>
              <td className="border-2 border-black">{value.id}</td>
              <td className="border-2 border-black">{value.customerId}</td>
              <td className="border-2 border-black">{value.date}</td>
              <td className="border-2 border-black">{value.status}</td>
              <td className="border-2 border-black">{value.payment}</td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setEditForm(value)}
                  className="py-2 px-4 my-2 justify-end bg-blue-500 text-xl text-white">#</button>
                {editForm && (<EditForm display={props.display} value={editForm} handleEditForm={handleEditForm} />)}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setRemoveForm(value.id)}
                  className="py-2 px-4 my-2 justify-end bg-red-500 text-xl text-white">-</button>
                {removeForm && (<RemoveForm display={props.display} value={removeForm} handleRemoveForm={handleRemoveForm} />)}
              </td>
            </tr>
          )))}
          </tbody>
          <tfoot className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Customer Id</th>
              <th className="border-2 border-black">Date</th>
              <th className="border-2 border-black">Status</th>
              <th className="border-2 border-black">Payment</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else if (props.display === "bill-detail") {
    pageData = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý hóa đơn chi tiết</h1>
        <div className="mx-auto w-1/12 flex justify-center">
          <button type="button" onClick={() => {setAddForm(true)}} className="py-2 px-4 justify-end bg-green-500 text-2xl text-white">+</button>
          { addForm && <AddForm display={props.display} handleAddForm={handleAddForm} /> }
        </div>
        <div className="w-1/12 mx-auto my-5 flex">
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              if (props.page <= 1) {
                handlePage(1)
              } else {
                handlePage(props.page - 1)
              }
            }}><FontAwesomeIcon icon={faChevronLeft} /></button>
          <p className="mx-2 py-2 text-2xl text-center">{props.page}</p>
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {handlePage(props.page + 1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
        <table className="mx-auto w-11/12">
          <thead className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Bill Id</th>
              <th className="border-2 border-black">Product Id</th>
              <th className="border-2 border-black">Discount Id</th>
              <th className="border-2 border-black">Amount</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
          { data === null ? (
            <tr>
              <td align="center" colSpan={7} className="border-2 border-black text-center">Không có thông tin</td>
            </tr>
          ) : (data.map((value: any) => (
            <tr className="text-center" key={uuidv4()}>
              <td className="border-2 border-black">{value.id}</td>
              <td className="border-2 border-black">{value.billId}</td>
              <td className="border-2 border-black">{value.productId}</td>
              <td className="border-2 border-black">{value.discountId}</td>
              <td className="border-2 border-black">{value.amount}</td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setEditForm(value)}
                  className="py-2 px-4 my-2 justify-end bg-blue-500 text-xl text-white">#</button>
                {editForm && (<EditForm display={props.display} value={editForm} handleEditForm={handleEditForm} />)}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setRemoveForm(value.id)}
                  className="py-2 px-4 my-2 justify-end bg-red-500 text-xl text-white">-</button>
                {removeForm && (<RemoveForm display={props.display} value={removeForm} handleRemoveForm={handleRemoveForm} />)}
              </td>
            </tr>
          )))}
          </tbody>
          <tfoot className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Bill Id</th>
              <th className="border-2 border-black">Product Id</th>
              <th className="border-2 border-black">Discount Id</th>
              <th className="border-2 border-black">Amount</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else if (props.display === "bill-status") {
    pageData = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý trạng thái hóa đơn</h1>
        <div className="mx-auto w-1/12 flex justify-center">
          <button type="button" onClick={() => {setAddForm(true)}} className="py-2 px-4 justify-end bg-green-500 text-2xl text-white">+</button>
          { addForm && <AddForm display={props.display} handleAddForm={handleAddForm} /> }
        </div>
        <div className="w-1/12 mx-auto my-5 flex">
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              if (props.page <= 1) {
                handlePage(1)
              } else {
                handlePage(props.page - 1)
              }
            }}><FontAwesomeIcon icon={faChevronLeft} /></button>
          <p className="mx-2 py-2 text-2xl text-center">{props.page}</p>
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {handlePage(props.page + 1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
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
          { data === null ? (
            <tr>
              <td align="center" colSpan={7} className="border-2 border-black text-center">Không có thông tin</td>
            </tr>
          ) : (data.map((value: any) => (
            <tr className="text-center" key={uuidv4()}>
              <td className="border-2 border-black">{value.id}</td>
              <td className="border-2 border-black">{value.description}</td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setEditForm(value)}
                  className="py-2 px-4 my-2 justify-end bg-blue-500 text-xl text-white">#</button>
                {editForm && (<EditForm display={props.display} value={editForm} handleEditForm={handleEditForm} />)}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setRemoveForm(value.id)}
                  className="py-2 px-4 my-2 justify-end bg-red-500 text-xl text-white">-</button>
                {removeForm && (<RemoveForm display={props.display} value={removeForm} handleRemoveForm={handleRemoveForm} />)}
              </td>
            </tr>
          )))}
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
  } else if (props.display === "category") {
    pageData = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý loại sản phẩm</h1>
        <div className="mx-auto w-1/12 flex justify-center">
          <button type="button" onClick={() => {setAddForm(true)}} className="py-2 px-4 justify-end bg-green-500 text-2xl text-white">+</button>
          { addForm && <AddForm display={props.display} handleAddForm={handleAddForm} /> }
        </div>
        <div className="w-1/12 mx-auto my-5 flex">
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              if (props.page <= 1) {
                handlePage(1)
              } else {
                handlePage(props.page - 1)
              }
            }}><FontAwesomeIcon icon={faChevronLeft} /></button>
          <p className="mx-2 py-2 text-2xl text-center">{props.page}</p>
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {handlePage(props.page + 1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
        <table className="mx-auto w-11/12">
          <thead className="bg-sky-300">
            <tr className="text-center">
            <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Name</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
          { data === null ? (
            <tr>
              <td align="center" colSpan={7} className="border-2 border-black text-center">Không có thông tin</td>
            </tr>
          ) : (data.map((value: any) => (
            <tr className="text-center" key={uuidv4()}>
              <td className="border-2 border-black">{value.id}</td>
              <td className="border-2 border-black">{value.name}</td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setEditForm(value)}
                  className="py-2 px-4 my-2 justify-end bg-blue-500 text-xl text-white">#</button>
                {editForm && (<EditForm display={props.display} value={editForm} handleEditForm={handleEditForm} />)}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setRemoveForm(value.id)}
                  className="py-2 px-4 my-2 justify-end bg-red-500 text-xl text-white">-</button>
                {removeForm && (<RemoveForm display={props.display} value={removeForm} handleRemoveForm={handleRemoveForm} />)}
              </td>
            </tr>
          )))}
          </tbody>
          <tfoot className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Name</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  } else if (props.display === "discount") {
    pageData = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý giảm giá</h1>
        <div className="mx-auto w-1/12 flex justify-center">
          <button type="button" onClick={() => {setAddForm(true)}} className="py-2 px-4 justify-end bg-green-500 text-2xl text-white">+</button>
          { addForm && <AddForm display={props.display} handleAddForm={handleAddForm} /> }
        </div>
        <div className="w-1/12 mx-auto my-5 flex">
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              if (props.page <= 1) {
                handlePage(1)
              } else {
                handlePage(props.page - 1)
              }
            }}><FontAwesomeIcon icon={faChevronLeft} /></button>
          <p className="mx-2 py-2 text-2xl text-center">{props.page}</p>
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {handlePage(props.page + 1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
        <table className="mx-auto w-11/12">
          <thead className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Description</th>
              <th className="border-2 border-black">Percent</th>
              <th className="border-2 border-black">Date Start</th>
              <th className="border-2 border-black">Date End</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
          { data === null ? (
            <tr>
              <td align="center" colSpan={7} className="border-2 border-black text-center">Không có thông tin</td>
            </tr>
          ) : (data.map((value: any) => (
            <tr className="text-center" key={uuidv4()}>
              <td className="border-2 border-black">{value.id}</td>
              <td className="border-2 border-black">{value.description}</td>
              <td className="border-2 border-black">{value.percent}</td>
              <td className="border-2 border-black">{value.dateStart}</td>
              <td className="border-2 border-black">{value.dateEnd}</td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setEditForm(value)}
                  className="py-2 px-4 my-2 justify-end bg-blue-500 text-xl text-white">#</button>
                {editForm && (<EditForm display={props.display} value={editForm} handleEditForm={handleEditForm} />)}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setRemoveForm(value.id)}
                  className="py-2 px-4 my-2 justify-end bg-red-500 text-xl text-white">-</button>
                {removeForm && (<RemoveForm display={props.display} value={removeForm} handleRemoveForm={handleRemoveForm} />)}
              </td>
            </tr>
          )))}
          </tbody>
          <tfoot className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Description</th>
              <th className="border-2 border-black">Percent</th>
              <th className="border-2 border-black">Date Start</th>
              <th className="border-2 border-black">Date End</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  } else if (props.display === "product") {
    pageData = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý sản phẩm</h1>
        <div className="mx-auto w-1/12 flex justify-center">
          <button type="button" onClick={() => {setAddForm(true)}} className="py-2 px-4 justify-end bg-green-500 text-2xl text-white">+</button>
          { addForm && <AddForm display={props.display} handleAddForm={handleAddForm} /> }
        </div>
        <div className="w-1/12 mx-auto my-5 flex">
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              if (props.page <= 1) {
                handlePage(1)
              } else {
                handlePage(props.page - 1)
              }
            }}><FontAwesomeIcon icon={faChevronLeft} /></button>
          <p className="mx-2 py-2 text-2xl text-center">{props.page}</p>
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {handlePage(props.page + 1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
        <table className="mx-auto w-11/12">
          <thead className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Category Id</th>
              <th className="border-2 border-black">Name</th>
              <th className="border-2 border-black">Fabric</th>
              <th className="border-2 border-black">Price</th>
              <th className="border-2 border-black">Description</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
          { data === null ? (
            <tr>
              <td align="center" colSpan={12} className="border-2 border-black text-center">Không có thông tin</td>
            </tr>
          ) : (data.map((value: any) => (
            <tr className="text-center" key={uuidv4()}>
              <td className="border-2 border-black">{value.id}</td>
              <th className="border-2 border-black">{value.categoryId}</th>
              <td className="border-2 border-black">{value.name}</td>
              <td className="border-2 border-black">{value.fabric}</td>
              <td className="border-2 border-black">{value.price}</td>
              <td className="border-2 border-black">{value.description}</td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setEditForm(value)}
                  className="py-2 px-4 my-2 justify-end bg-blue-500 text-xl text-white">#</button>
                {editForm && (<EditForm display={props.display} value={editForm} handleEditForm={handleEditForm} />)}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setRemoveForm(value.id)}
                  className="py-2 px-4 my-2 justify-end bg-red-500 text-xl text-white">-</button>
                {removeForm && (<RemoveForm display={props.display} value={removeForm} handleRemoveForm={handleRemoveForm} />)}
              </td>
            </tr>
          )))}
          </tbody>
          <tfoot className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Category Id</th>
              <th className="border-2 border-black">Name</th>
              <th className="border-2 border-black">Fabric</th>
              <th className="border-2 border-black">Price</th>
              <th className="border-2 border-black">Description</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else if (props.display === "product-image") {
    pageData = (
      <div className="w-10/12">
        <h1 className="py-5 text-center text-4xl">Quản lý hình ảnh sản phẩm</h1>
        <div className="mx-auto w-1/12 flex justify-center">
          <button type="button" onClick={() => {setAddForm(true)}} className="mx-2 py-2 px-4 justify-end bg-green-500 text-2xl text-white">+</button>
          { addForm && <AddForm display={props.display} handleAddForm={handleAddForm} /> }
          <button type="button" onClick={() => {setRefreshPage(true)}} className="mx-2 py-2 px-4 justify-end border-2 border-sky-400 bg-white text-2xl text-sky-400"><FontAwesomeIcon icon={faArrowsRotate} /></button>
        </div>
        <div className="w-1/12 mx-auto my-5 flex">
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {
              if (props.page <= 1) {
                handlePage(1)
              } else {
                handlePage(props.page - 1)
              }
            }}><FontAwesomeIcon icon={faChevronLeft} /></button>
          <p className="mx-2 py-2 text-2xl text-center">{props.page}</p>
          <button type="button" className="py-2 px-4 rounded-lg bg-sky-500 text-2xl text-white"
            onClick={() => {handlePage(props.page + 1)}}><FontAwesomeIcon icon={faChevronRight} /></button>
        </div>
        <table className="mx-auto w-11/12">
          <thead className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Product Id</th>
              <th className="border-2 border-black">Image</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </thead>
          <tbody>
          { data === null ? (
            <tr>
              <td align="center" colSpan={5} className="border-2 border-black text-center">Không có thông tin</td>
            </tr>
          ) : (data.map((value: any) => (
            <tr className="text-center" key={uuidv4()}>
              <td className="border-2 border-black">{value.id}</td>
              <td className="border-2 border-black">{value.productId}</td>
              <td className="border-2 border-black">
                {value.image && <img src={`data:image/png;base64,${value.image}`} className="mx-auto w-[150px]"/>}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setEditForm(value)}
                  className="py-2 px-4 my-2 justify-end bg-blue-500 text-xl text-white">#</button>
                {editForm && (<EditForm display={props.display} value={editForm} handleEditForm={handleEditForm} />)}
              </td>
              <td className="w-1/12 border-2 border-black">
                <button
                  type="button"
                  onClick={() => setRemoveForm(value.id)}
                  className="py-2 px-4 my-2 justify-end bg-red-500 text-xl text-white">-</button>
                {removeForm && (<RemoveForm display={props.display} value={removeForm} handleRemoveForm={handleRemoveForm} />)}
              </td>
            </tr>
          )))}
          </tbody>
          <tfoot className="bg-sky-300">
            <tr className="text-center">
              <th className="border-2 border-black">Id</th>
              <th className="border-2 border-black">Product Id</th>
              <th className="border-2 border-black">Image</th>
              <th className="border-2 border-black">Edit</th>
              <th className="border-2 border-black">Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  } else {
    pageData = <div className="mx-auto w-full my-20 text-3xl text-center">Không có thông tin</div>
  }

  return pageData
}

export default AdminDisplay;
