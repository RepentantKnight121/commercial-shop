import Menu from "../components/Menu";

function About(): JSX.Element {
  return (
    <div className="font-barlow">
      <Menu />

      {/* main content */}
      <div className="w-4/5 mx-auto mt-2 bg-black">Đang suy nghĩ</div>
    </div>
  );
}

export default About;
