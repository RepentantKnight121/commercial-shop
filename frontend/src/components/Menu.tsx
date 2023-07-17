import { faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type MenuProps = {
  language: string;
  onChangeLanguage: (language: string) => void;
};

function Menu(props: MenuProps): JSX.Element {
  const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;

    if (selectedOption) {
      props.onChangeLanguage(selectedOption);
    }
  };

  return (
    <nav className="ml-24 mr-24 border-2 h-30
                    flex place-content-between">
      <div className="flex justify-start">
        <a href="/">
          <img src="./public/asset/logo.jpg" alt="Logo" />
        </a>
        <ul className="m-5 flex list-none">
          <li className="m-5">
            <a href="/"
               className="font-barlow text-6xl
                          hover:border-b-2 hover:border-sky-500">
              {props.language === "vn" ? "Trang chủ" : "Home"}
            </a>
          </li>
          <li className="m-5">
            <a href="/product"
               className="font-barlow text-6xl
                          hover:border-b-2 hover:border-sky-500">
              {props.language === "vn" ? "Sản phẩm" : "Product"}
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-end">
        <form className="border-2 border-sky-500">
          <input type="search" name="searchField" />
          <input type="submit" value="Search">
            <FontAwesomeIcon
              icon={faSearch}
              className="mt-5 mb-10 p-5 text-6xl
                         hover:cursor-pointer hover:bg-sky-500 hover:text-white" />
          </input>
        </form>
        <FontAwesomeIcon icon={faCartShopping}
                         className="mt-5 mb-10 p-5 text-6xl
                                    hover:cursor-pointer hover:bg-sky-500 hover:text-white" />
        <div>{props.language === "vn" ? "Ngôn ngữ:" : "Language:"}
          <select name="languages" value={props.language} onChange={handleChangeLanguage}
                  className="bg-white text-6xl">
            <option value="vn">VN 🇻🇳</option>
            <option value="en">EN 🇺🇸</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
