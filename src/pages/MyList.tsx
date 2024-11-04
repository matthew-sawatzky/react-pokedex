import Wrapper from "../sections/Wrapper";
import Login from "../assets/Login";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PokemonCardGrid from "../components/PokemonCardGrid";
import { useEffect } from "react";
import { getUserPokemons } from "../app/reducers/getUserPokemons";

function MyList() {
  const { userInfo } = useAppSelector(({ app }) => app);
  const { userPokemons } = useAppSelector(({ pokemon }) => pokemon);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserPokemons())
  }, [userInfo, dispatch]);
  useEffect(() => {
    
  }, [userPokemons])

  return (
    <div className="list">
      {userInfo ? <PokemonCardGrid pokemons={userPokemons} /> : <Login />}
    </div>
  );
}

export default Wrapper(MyList);
