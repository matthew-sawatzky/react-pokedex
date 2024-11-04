import pokeballIcon from "../assets/pokeball-icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

function Navbar() {
  const location = useLocation()

  const navigationRoutes = [
    {
      name: "Search",
      route: "/search",
    },
    {
      name: "Compare",
      route: "/compare",
    },
    {
      name: "Pokemon",
      route: "/pokemon",
    },
    {
      name: "My List",
      route: "/list",
    },
  ];

  useEffect(() =>{
    const index = navigationRoutes.findIndex(({ route }) => location.pathname.includes(route));
    ul(index);
  }, [location.pathname, navigationRoutes])

  function ul(index: number){
    const underlines = document.querySelectorAll<HTMLElement>('.underline');
    for(let i=0; i<underlines.length; i++){
      underlines[i].style.transform = "translate3d(" + index * 100 + "%,0,0)";
    }
  }


  return (
    <nav>
      <div className="block">
        <img src={pokeballIcon} alt="Pokeball Icon" />
      </div>
      <div className="data">
        <ul>
          <div className="underline"></div>
          <div className="underline"></div>
          {
            navigationRoutes.map(({ name, route }, index) => {
              return <Link to={route} key={index}><li>{name}</li></Link>;
            })
          }
        </ul>
      </div>
      <div className="block">
        <GiHamburgerMenu />
      </div>
    </nav>
  );
}

export default Navbar;
