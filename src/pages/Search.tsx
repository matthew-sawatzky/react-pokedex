import { useEffect } from 'react'
import Wrapper from '../sections/Wrapper'
import { useAppDispatch } from '../app/hooks'
import { getInitialPokemonData } from '../app/reducers/getInitialPokemonData';
import { useAppSelector } from '../app/hooks'

function Search() {
  const dispatch = useAppDispatch();
  const { allPokemon } = useAppSelector(({pokemon}) => pokemon)
  useEffect(() => {
    dispatch(getInitialPokemonData())
  }, [dispatch])

  useEffect(() => {
if(allPokemon){
  const clonedPokemons = [...allPokemon]
  const randomPokemonsId = clonedPokemons.sort(() => Math.random()-Math.random()).slice(0, 20);
  console.log(randomPokemonsId);

}
  }, [allPokemon, dispatch])
  return (
    <div>Search</div>
  )
}

export default Wrapper(Search);