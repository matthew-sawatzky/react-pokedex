import { userPokemonsType } from "../utils/Types";

function PokemonCardGrid({ pokemons }: { pokemons: userPokemonsType[] }) {
  console.log(pokemons); // Add this line to log the pokemons array

  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons.map((data: userPokemonsType) => {
            console.log(data); // Add this line to log each pokemon data
            return (
              <div key={data.id} className="pokemon-card">
                <div className="pokemon-card-list"></div>
                <div className="pokemon-card-compare"></div>
                <h3 className="pokemon-card-title">{data.name}</h3>
                <img
                  src={data.image}
                  alt="pokemon"
                  className="pokemon-card-image"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PokemonCardGrid;
