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
      <footer className="text-center">Commercial shop - 2023</footer>
    </div>
  );
}

export default Home;
