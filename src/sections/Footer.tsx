import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { signOut } from "firebase/auth";
import { useAppDispatch } from "../app/hooks";
import { setUserStatus, setToast } from "../app/slices/AppSlice";
import { firebaseAuth } from "../utils/FirebaseConfig.ts";
import { pokemonTabs } from "../utils/Constants";
import { useLocation } from "react-router-dom";
import { setPokemonTab } from "../app/slices/AppSlice";
import { useAppSelector } from "../app/hooks";

function Footer() {
  const dispatch = useAppDispatch();
  const { currentPokemonTab } = useAppSelector(({ app }) => app);
  const location = useLocation();
  const handleLogout = () => {
    signOut(firebaseAuth);
    dispatch(setUserStatus(undefined));
    dispatch(setToast("Logged out successfully!"));
  };

  const routes = [
    {
      name: pokemonTabs.description,
      value: "Description",
    },
    {
      name: pokemonTabs.evolution,
      value: "Evolution",
    },
    {
      name: pokemonTabs.locations,
      value: "Catching",
    },
    {
      name: pokemonTabs.moves,
      value: "Capable Moves",
    },
  ];

  return (
    <footer>
      <div className="block"></div>
      <div className="data">
        {location.pathname.includes("/pokemon") && (
          <ul>
            {routes.map((route) => {
              return (
                <li
                  key={route.name}
                  className={`${currentPokemonTab === route.name ? "active" : ""}`}
                  onClick={() => {
                    dispatch(setPokemonTab(route.name));
                  }}
                >
                  {route.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogout} />
      </div>
    </footer>
  );
}

export default Footer;
