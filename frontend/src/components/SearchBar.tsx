import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar(): JSX.Element {
  return (
    <div className="flex mr-3">
      <input
        className="border-2 border-sky-500 px-2 rounded-md w-60 h-9 placeholder:italic placeholder:text-slate-400"
        placeholder="Bạn đang tìm sản phẩm..."
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="-ml-10 p-2 text-xl text-blue-light hover:cursor-pointer"
      />
    </div>
  );
}
