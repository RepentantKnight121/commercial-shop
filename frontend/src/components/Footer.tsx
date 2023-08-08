import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer(): JSX.Element {
  return (
    <footer className="mt-8 py-6 bg-sky-400 text-center text-white">
      <div className="mx-auto w-1/4 flex items-end">
        <FontAwesomeIcon icon={faFacebook} className="p-2 text-4xl hover:bg-white hover:text-sky-400 hover:cursor-pointer" />
        <FontAwesomeIcon icon={faInstagram} className="p-2 text-4xl hover:bg-white hover:text-sky-400 hover:cursor-pointer" />
        <FontAwesomeIcon icon={faTiktok} className="p-2 text-4xl hover:bg-white hover:text-sky-400 hover:cursor-pointer" />
      </div>
      <div className="py-5">Commercial shop - 2023</div>
    </footer>
  )
}