import { useState } from "react";

import Menu from "../components/Menu";

function Home(): JSX.Element {
  const [language, setLanguage] = useState<string>("vn");

  const handleSelectLanguage = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  return (
    <div>
      <Menu language={language} onChangeLanguage={handleSelectLanguage} />
      <div>Home Page</div>
    </div>
  );
}

export default Home;
