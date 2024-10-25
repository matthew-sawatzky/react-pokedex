import React from "react";
import pokeballIcon from "../assets/pokeball-icon.png";
import { GiHamburgerMenu } from "react-icons/gi";

function Navbar() {
  return (
    <nav>
      <div className="block">
        <img src={pokeballIcon} alt="Pokeball Icon" />
      </div>
      <div className="data"></div>
      <div className="block"></div>
      <GiHamburgerMenu />
    </nav>
  );
}

export default Navbar;
