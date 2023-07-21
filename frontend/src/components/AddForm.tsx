import axios from "axios"
import { useState } from "react"

type Display = {
  display: string
  handleAddForm: (value: boolean) => void
}

function AddForm(props: Display): JSX.Element {
  let input: JSX.Element = <div></div>

  const [input1, setInput1] = useState<string>("")
  const [input2, setInput2] = useState<string>("")
  const [input3, setInput3] = useState<string>("")
  const [input4, setInput4] = useState<string>("")
  const [input5, setInput5] = useState<string>("")
  const [input6, setInput6] = useState<string>("")
  const [input7, setInput7] = useState<string>("")
  const [input8, setInput8] = useState<string>("")
  const [input9, setInput9] = useState<string>("")
  const [input10, setInput10] = useState<string>("")

  const handleAddForm = (value: boolean) => {
    props.handleAddForm(value)
  }

  const handleAddingValue = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (props.display === "account") {
      await axios.post(`http://localhost:4505/api/${props.display}`, {
        username: input1,
        roleId: input2,
        password: input3,
        displayName: input4,
        email: input5,
        active: input6
      })
      .then(() => {
        alert("Adding account successfully")
      })
      .catch((error) => {
        alert(error);
      })
    } else if (props.display === "account-role") {
      await axios.post(`http://localhost:4505/api/${props.display}`, {
        id: parseInt(input1),
        description: input2
      })
      .then(() => {
        alert("Adding account successfully")
      })
      .catch((error) => {
        alert(error);
      })
    }
  };

  if (props.display === "account") {
    input = (
      <div>
        <p>Username: <input type="text" onChange={(event) => {setInput1(event.target.value)}}></input></p>
        <p>Role Id: <input type="text" onChange={(event) => {setInput2(event.target.value)}}></input></p>
        <p>Password: <input type="text" onChange={(event) => {setInput3(event.target.value)}}></input></p>
        <p>Display Name: <input type="text" onChange={(event) => {setInput4(event.target.value)}}></input></p>
        <p>Email: <input type="text" onChange={(event) => {setInput5(event.target.value)}}></input></p>
        <p>Active: <input type="text" onChange={(event) => {setInput6(event.target.value)}}></input></p>
      </div>
    )
  } else if (props.display === "account-role") {
    input = (
      <div>
        <p>Id: <input type="text" onChange={(event) => {setInput1(event.target.value)}}></input></p>
        <p>Description: <input type="text" onChange={(event) => {setInput2(event.target.value)}}></input></p>
      </div>
    )
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Thêm {props.display}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {handleAddForm(false)}}>
                  <span className="bg-transparent text-slate-500 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                {input}
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(event) => {
                    handleAddingValue(event)
                    handleAddForm(false)
                  }}>
                  Đồng ý
                </button>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {handleAddForm(false)}}>
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
  
export default AddForm