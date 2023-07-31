import axios from "axios"

type Display = {
  display: string
  value: any
  handleRemoveForm: (value: string) => void
}

function RemoveForm(props: Display): JSX.Element {
  const handleRemoveForm = (value: string) => {
    props.handleRemoveForm(value)
  }

  const handleRemovingValue = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (props.display === "account") {
      await axios.delete(`http://localhost:4505/api/${props.display}/${props.value}`)
      .then(() => {
        alert("Remove account successfully")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "account-role") {
      await axios.delete(`http://localhost:4505/api/${props.display}/${props.value}`)
      .then(() => {
        alert("Remove account-role successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "bill-info") {
      await axios.delete(`http://localhost:4505/api/${props.display}/${props.value}`)
      .then(() => {
        alert("Remove bill-info successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "bill-detail") {
      await axios.delete(`http://localhost:4505/api/${props.display}/${props.value}`)
      .then(() => {
        alert("Remove bill-detail successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "bill-status") {
      await axios.delete(`http://localhost:4505/api/${props.display}/${props.value}`)
      .then(() => {
        alert("Remove bill-status successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "category") {
      await axios.delete(`http://localhost:4505/api/${props.display}/${props.value}`)
      .then(() => {
        alert("Remove category successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "customer") {
      await axios.delete(`http://localhost:4505/api/${props.display}/${props.value}`)
      .then(() => {
        alert("Remove customer successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "discount") {
      await axios.delete(`http://localhost:4505/api/${props.display}/${props.value}`)
      .then(() => {
        alert("Remove discount successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "product") {
      await axios.delete(`http://localhost:4505/api/${props.display}/${props.value}`)
      .then(() => {
        alert("Remove product successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    } else if (props.display === "product-image") {
      await axios.delete(`http://localhost:4505/api/${props.display}/${props.value}`)
      .then(() => {
        alert("Remove product-image successfully!")
      })
      .catch((error) => {
        alert(error)
      })
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Xoá {props.display}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => {handleRemoveForm("")}}>
                  <span className="bg-transparent text-slate-500 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                Bạn có thực sự muốn xóa giá trị này? {props.value}
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={(event) => {
                    handleRemovingValue(event)
                    handleRemoveForm("")
                  }}>
                  Đồng ý
                </button>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {handleRemoveForm("")}}>
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
  
export default RemoveForm