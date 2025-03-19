
import { Logout } from "./Logout";

const Header = () => {
  const setShowLogin = (value: boolean) => {
    console.log("setShowLogin called with value:", value);
  };

  return (
    <header className="mb-4 text-center bg-white py-2 flex flex-row">
      <h1 className="font-[Bebas_Neue] text-6xl text-[#D23715] w-full">super</h1>
      <Logout setShowLogin={setShowLogin} />      
    </header>
  );
};

export default Header;
