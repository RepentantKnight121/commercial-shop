import axios from "axios"
import { ChangeEvent, useEffect, useState } from "react"

type Display = {
  display: string
  value: any
  handleEditForm: (value: string) => void
}

function EditForm(props: Display): JSX.Element {
  let inputForm: JSX.Element | null = null;

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
  const [convertImage, setConvertImage] = useState<string>("")

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const base64String = btoa(String.fromCharCode(...new Uint8Array(event.target?.result as ArrayBuffer)))
        setConvertImage(base64String)
      };
      reader.readAsArrayBuffer(file)
    }
  }

  const handleEditForm = (value: string) => {
    props.handleEditForm(value)
  }

  const handleEditingValue = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    if (props.display === "account") {
      await axios.put(`http://localhost:4505/api/${props.display}/${props.value}`, {
        username: input1,
        roleId: input2,
        password: input3,
        displayName: input4,
        email: input5,
        active: input6
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
    } else if (props.display === "bill-info") {
      await axios.patch(`http://localhost:4505/api/${props.display}/${props.value.id}`, {
        customerId: input2,
        date: `${input3}T00:00:00+07:00`,
        status: parseInt(input4),
        payment: parseInt(input5)
      })
      .then(() => {
        alert("Edit bill-info successfully")
      })
      .catch((error) => {
        alert(error);
      })
    } else if (props.display === "bill-status") {
      await axios.patch(`http://localhost:4505/api/${props.display}/${props.value.id}`, {
        description: input2
      })
      .then(() => {
        alert("Edit bill-status successfully")
      })
      .catch((error) => {
        alert(error);
      })
    } else if (props.display === "category") {
      console.log(input2)
      await axios.patch(`http://localhost:4505/api/${props.display}/${props.value.id}`, {
        name: input2
      })
      .then(() => {
        alert("Edit category successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "customer") {
      await axios.patch(`http://localhost:4505/api/${props.display}/${props.value.id}`, {
        accountUsername: input2,
        name: input3,
        phone: input4,
        address: input5
      })
      .then(() => {
        alert("Edit customer successfully")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "discount") {

    } else if (props.display === "product-image") {
      await axios.patch(`http://localhost:4505/api/${props.display}/${props.value.id}`, {
        productId: input2,
        image: convertImage
      })
      .then(() => {
        alert("Edit product-image successfully")
      })
      .catch((error) => {
        alert(error)
      })
    }
  }

  useEffect(() => {
    if (props.display === "account") {
      setInput1(props.value.username)
      setInput2(props.value.roleId)
      setInput3(props.value.password)
      setInput4(props.value.displayName)
      setInput5(props.value.email)
      setInput6(props.value.active)
    } else if (props.display === "account-role") {
      setInput1(props.value.id)
      setInput2(props.value.description)
    } else if (props.display === "bill-info") {
      setInput1(props.value.id)
      setInput2(props.value.customerId)
      setInput3(props.value.date)
      setInput4(props.value.status)
      setInput5(props.value.payment)
    } else if (props.display === "bill-status") {
      setInput1(props.value.id)
      setInput2(props.value.description)
    } else if (props.display === "category") {
      setInput1(props.value.id)
      setInput2(props.value.name)
    } else if (props.display === "customer") {
      setInput1(props.value.id)
      setInput2(props.value.accountUsername)
      setInput3(props.value.name)
      setInput4(props.value.phone)
      setInput5(props.value.address)
    } else if (props.display === "discount") {
      setInput1(props.value.id)
      setInput2(props.value.description)
      setInput3(props.value.percent)
      setInput4(props.value.dateStart)
      setInput5(props.value.dateEnd)
    } else if (props.display === "product") {
      setInput1(props.value.id)
      setInput2(props.value.categoryId)
      setInput3(props.value.name)
      setInput4(props.value.color)
      setInput5(props.value.fabric)
      setInput6(props.value.size)
      setInput7(props.value.form)
      setInput8(props.value.price)
      setInput9(props.value.amount)
      setInput10(props.value.description)
    } else if (props.display === "product-image") {
      setInput1(props.value.id)
      setInput2(props.value.productId)
    }
  }, [props.display, props.value])

  if (props.display === "account") {
    inputForm = (
      <div>
        <p>Username: <input type="text" value={input1} readOnly /></p>
        <p>Role Id: <input type="text" value={input2} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput2(event.target.value)} /></p>
        <p>Password: <input type="text" value={input3} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput3(event.target.value)} /></p>
        <p>Display Name: <input type="text" value={input4} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput4(event.target.value)} /></p>
        <p>Email: <input type="text" value={input5} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput5(event.target.value)} /></p>
        <p>Active: <input type="text" value={input6} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput6(event.target.value)} /></p>
      </div>
    )
  } else if (props.display === "account-role") {
    inputForm = (
      <div>
        <p>Id: <input type="text" value={input1} readOnly /></p>
        <p>Description: <input type="text" value={input2} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput2(event.target.value)} /></p>
      </div>
    )
  } else if (props.display === "bill-info") {
    inputForm = (
      <div>
        <p>Id: <input type="text" value={input1} onChange={(event: ChangeEvent<HTMLInputElement>) => setInput1(event.target.value)} /></p>
        <p>Customer Id: <input type="text" value={input2} onChange={(event: ChangeEvent<HTMLInputElement>) => setInput2(event.target.value)} /></p>
        <p>Date: <input type="date" defaultValue={input3} onChange={(event: ChangeEvent<HTMLInputElement>) => setInput3(event.target.value)} /></p>
        <p>Status: <input type="text" value={input4} onChange={(event: ChangeEvent<HTMLInputElement>) => setInput4(event.target.value)} /></p>
        <p>Payment: <input type="text" value={input5} onChange={(event: ChangeEvent<HTMLInputElement>) => setInput5(event.target.value)} /></p>
      </div>
    )
  } else if (props.display === "bill-status") {
    inputForm = (
      <div>
        <p>Id: <input type="text" value={input1} readOnly /></p>
        <p>Description: <input type="text" value={input2} onChange={(event) => setInput2(event.target.value)} /></p>
      </div>
    )
  } else if (props.display === "category") {
    inputForm = (
      <div>
        <p>Id: <input type="text" value={input1} readOnly /></p>
        <p>Name: <input type="text" value={input2} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput2(event.target.value)} /></p>
      </div>
    )
  } else if (props.display === "customer") {
    inputForm = (
      <div>
        <p>Id: <input type="text" value={input1} onChange={(event:React.ChangeEvent<HTMLInputElement> ) => setInput1(event.target.value)} /></p>
        <p>Account Username: <input type="text" value={input2} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput2(event.target.value)} /></p>
        <p>Name: <input type="text" value={input3} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput3(event.target.value)} /></p>
        <p>Phone: <input type="text" value={input4} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput4(event.target.value)} /></p>
        <p>Address: <input type="text" value={input5} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInput5(event.target.value)} /></p>
      </div>
    )
  } else if (props.display === "discount") {
    inputForm = (
      <div>
        <p>Id: <input type="text" value={input1} onChange={(event) => setInput1(event.target.value)} /></p>
        <p>Description: <input type="text" value={input2} onChange={(event) => setInput2(event.target.value)} /></p>
        <p>Percent: <input type="text" value={input3} onChange={(event) => setInput3(event.target.value)} /></p>
        <p>Date Start: <input type="date" value={input4} onChange={(event) => setInput4(event.target.value)} /></p>
        <p>Date End: <input type="date" value={input5} onChange={(event) => setInput5(event.target.value)} /></p>
      </div>
    )
  } else if (props.display === "product") {
    inputForm = (
      <div>
        <p>Id: <input type="text" value={input1} onChange={(event) => setInput1(event.target.value)} /></p>
        <p>Category Id: <input type="text" value={input2} onChange={(event) => setInput2(event.target.value)} /></p>
        <p>Name: <input type="text" value={input3} onChange={(event) => setInput3(event.target.value)} /></p>
        <p>Color: <input type="text" value={input4} onChange={(event) => setInput4(event.target.value)} /></p>
        <p>Fabric: <input type="text" value={input5} onChange={(event) => setInput5(event.target.value)} /></p>
        <p>Size: <input type="text" value={input6} onChange={(event) => setInput6(event.target.value)} /></p>
        <p>Form: <input type="text" value={input7} onChange={(event) => setInput7(event.target.value)} /></p>
        <p>Price: <input type="number" value={input8} onChange={(event) => setInput8(event.target.value)} /></p>
        <p>Amount: <input type="number" value={input9} onChange={(event) => setInput9(event.target.value)} /></p>
        <p>Description: <input type="text" value={input10} onChange={(event) => setInput10(event.target.value)} /></p>
      </div>
    )
  } else if (props.display === "product-image") {
    inputForm = (
      <div>
        <p>Id: <input type="text" value={input1} readOnly /></p>
        <p>Product Id: <input type="text" value={input2} onChange={(event) => setInput2(event.target.value)} /></p>
        <p>Image: <input type="file" accept="image/*"
          onChange={handleImageUpload} />
          {convertImage ? (
            <img  src={`data:image/png;base64,${convertImage}`} alt="Input image" className="mt-4" />
          ) : (
            <img src={`data:image/png;base64,${props.value.image}`} alt="Default image" className="mt-4" />
          )}
        </p>
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
              <div className="relative p-6 flex-auto text-left">
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