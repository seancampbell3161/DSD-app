import React from "react";
import { Logout } from "./Logout";

const Header = () => {
  return (
    <header className="my-4 text-center flex flex-row">
      <h1 className="font-[Bebas_Neue] text-6xl text-[#D23715] w-full">super</h1>
      <Logout />      
    </header>
  );
};

export default Header;
