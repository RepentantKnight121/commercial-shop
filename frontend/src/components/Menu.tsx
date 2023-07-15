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
    <nav className="ml-16 mr-16 border-2 h-38
                    flex place-content-between">
      <div className="flex justify-start">
        <a href="/">
          <img src="./public/asset/logo.jpg" alt="Logo" />
        </a>
        <ul className="flex list-none">
          <li className="p-10">
            <a href="/"
               className="font-barlow text-5xl
                          hover:border-b-2 hover:border-sky-400">
              {props.language === "vn" ? "Trang chủ" : "Home"}
            </a>
          </li>
          <li className="p-10">
            <a href="/product"
               className="font-barlow text-5xl
                          hover:border-b-2 hover:border-sky-400">
              {props.language === "vn" ? "Sản phẩm" : "Product"}
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-end">
        <FontAwesomeIcon icon={faSearch} className="text-5xl hover:cursor-pointer" />
        <FontAwesomeIcon icon={faCartShopping} className="text-5xl hover:cursor-pointer" />
        <select name="languages" value={props.language} onChange={handleChangeLanguage}>
          <option value="vn">VN 🇻🇳</option>
          <option value="en">EN 🇺🇸</option>
        </select>
      </div>
    </nav>
  );
}

export default Menu;
