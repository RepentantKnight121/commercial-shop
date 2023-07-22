import axios from "axios"
import { useEffect, useState } from "react"

type Display = {
  display: string
  value: any
  handleEditForm: (value: string) => void
}

function EditForm(props: Display): JSX.Element {
  let inputForm: JSX.Element | null = null;
  const [input1, setInput1] = useState<string>("")
  const [input2, setInput2] = useState<string>("")

  const handleEditForm = (value: string) => {
    props.handleEditForm(value)
  }

  const handleEditingValue = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (props.display === "account") {
      await axios.put(`http://localhost:4505/api/${props.display}/${props.value}`, {

      })
      .then(() => {
        alert("Edit account successfully")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "account-role") {
      await axios.patch(`http://localhost:4505/api/${props.display}/${props.value.id}`, {
        description: input2
      })
      .then(() => {
        alert("Edit account-role successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    }
  }

  useEffect(() => {
    if (props.display === "account-role") {
      setInput1(props.value.id)
      setInput2(props.value.description)
    }
  }, [props.display, props.value])

  if (props.display === "account") {

  } else if (props.display === "account-role") {
    inputForm = (
      <div>
        <p>Id: <input type="text" value={input1} readOnly></input></p>
        <p>Description: <input type="text" value={input2} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setInput2(event.target.value)}}></input></p>
      </div>
    )
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Thay đổi {props.display}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {handleEditForm("")}}>
                  <span className="bg-transparent text-slate-500 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                {inputForm}
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(event) => {
                    handleEditingValue(event)
                    handleEditForm("")
                  }}>
                  Đồng ý
                </button>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {handleEditForm("")}}>
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
  
export default EditForm