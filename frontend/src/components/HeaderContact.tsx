import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderContact(): JSX.Element {
  return (
    <div className="p-2 bg-slate-900">
      <div className="ml-96 mr-96 flex">
        <div className="text-1xl text-slate-100">
          <FontAwesomeIcon icon={faPhone} className="px-2"/>
          Hotline:
          <a href="tel:092.405.XXXX">092.405.XXXX</a>
        </div>
      </div>
    </div>
  )
}