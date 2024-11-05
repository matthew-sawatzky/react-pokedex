import React from 'react'
import { useAppSelector } from '../../app/hooks'
import PokemonContainer from '../../components/PokemonContainer'

function Description() {
    const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
    )
  return (
    <div>
        <PokemonContainer image={pokemonData?.image!} />
    </div>
  )
}

export default Description