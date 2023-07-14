import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
    <nav className="ml-10 mr-10 flex">
      <a href="/">
        <img src="./public/asset/logo.jpg" alt="Logo" />
      </a>
      <ul className="flex list-none">
        <li className="p-10 border-2">
          <a href="/" className="font-barlow text-5xl">
            {props.language === "vn" ? "Trang chủ" : "Home"}
          </a>
        </li>
        <li className="p-10 border-2">
          <a href="/product" className="font-barlow text-5xl">
            {props.language === "vn" ? "Sản phẩm" : "Product"}
          </a>
        </li>
        <li className="p-10 border-2">
          <a href="/about" className="font-barlow text-5xl">
            {props.language === "vn" ? "Về chúng tôi" : "About"}
          </a>
        </li>
        <li className="p-10 border-2">
          <a href="/news" className="font-barlow text-5xl">
            {props.language === "vn" ? "Tin mới" : "News"}
          </a>
        </li>
      </ul>
      <a href="">
        <FontAwesomeIcon icon={faSearch} />
      </a>
      <a href="">
        <img src="./public/asset/icon-account.png" alt="Logo" />
      </a>
      <a href="">
        <img src="./public/asset/icon-cart.png" alt="Logo" />
      </a>
      <select name="languages" value={props.language} onChange={handleChangeLanguage}>
        <option value="vn">VN 🇻🇳</option>
        <option value="en">EN 🇺🇸</option>
      </select>
    </nav>
  );
}

export default Menu;
