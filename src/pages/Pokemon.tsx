// @ts-nocheck

import { useCallback, useEffect, useState } from "react";
import Wrapper from "../sections/Wrapper";
import { useParams } from "react-router-dom";
import { defaultImages, images } from "../utils/PokemonImages";
import { extractColors } from "extract-colors";
import axios from "axios";
import Evolution from "./PokemonPages/Evolution";
import Locations from "./PokemonPages/Locations";
import CapableMoves from "./PokemonPages/CapableMoves";
import Description from "./PokemonPages/Description";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setCurrentPokemon } from "../app/slices/PokemonSlice";
import { setPokemonTab } from "../app/slices/AppSlice";
import Loader from "../components/Loader";
import {
  pokemonRoute,
  pokemonSpeciesRoute,
  pokemonTabs,
} from "../utils/Constants";

function Pokemon() {
  const params = useParams();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentPokemonTab = useAppSelector(
    ({ app: { currentPokemonTab } }) => currentPokemonTab
  );
  const currentPokemon = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );

  useEffect(() => {
    dispatch(setPokemonTab(pokemonTabs.description));
  }, [dispatch]);

  const getRecursiveEvolution = useCallback(
    (evolutionChain, level, evolutionData) => {
      if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
          pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace(
              "pokemon-species",
              "pokemon"
            ),
          },
          level,
        });
      }
      evolutionData.push({
        pokemon: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level,
      });
      return getRecursiveEvolution(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionData
      );
    },
    []
  );

  const getEvolutionData = useCallback(
    (evolutionChain) => {
      const evolutionData = [];
      getRecursiveEvolution(evolutionChain, 1, evolutionData);
      return evolutionData;
    },
    [getRecursiveEvolution]
  );

  const [isDataLoading, setIsDataLoading] = useState(true);
const getPokemonInfo = useCallback(
  async (image) => {
    try {
      console.log(`${pokemonRoute}/${params.id}`); // Log the constructed route for params.id
      const { data } = await axios.get(`${pokemonRoute}/${id}`);
      console.log(`${pokemonSpeciesRoute}/${data.id}`); // Log the constructed route for data.id

      // Fetch encounter data
      const { data: dataEncounters } = await axios.get(
        data.location_area_encounters
      );

      // Fetch species data to get the evolution chain URL
      const { data: speciesData } = await axios.get(
        `${pokemonSpeciesRoute}/${data.id}`
      );
      const { data: evolutionData } = await axios.get(
        speciesData.evolution_chain.url
      );

      // Process abilities and moves
      const pokemonAbilities = {
        abilities: data.abilities.map(({ ability }) => ability.name),
        moves: data.moves.map(({ move }) => move.name),
      };

      // Process encounter locations
      const encounters = dataEncounters.map((encounter) =>
        encounter.location_area.name.toUpperCase().split("-").join(" ")
      );

      // Get evolution data using the helper function
      const evolution = getEvolutionData(evolutionData.chain);

      // Find the evolution level for the current Pokémon
      const evolutionLevel = evolution.find(
        ({ pokemon }) => pokemon.name === data.name
      )?.level;

      // Process stats data
      const stats = data.stats.map(({ stat, base_stat }) => ({
        name: stat.name,
        value: base_stat,
      }));

      // Dispatch the processed data to the Redux store
      dispatch(
        setCurrentPokemon({
          id: data.id,
          name: data.name,
          types: data.types.map(({ type }) => type.name),
          image,
          stats,
          encounters,
          evolutionLevel,
          evolution,
          pokemonAbilities,
        })
      );

      setIsDataLoading(false); // Set loading to false after data processing
    } catch (error) {
      console.error("Failed to fetch Pokémon data:", error);
      setIsDataLoading(false); // Stop loading if there's an error
    }
  },
  [params.id, dispatch, getEvolutionData]
);


  useEffect(() => {
    const imageElemet = document.createElement("img");
    imageElemet.src = images[params.id];
    const options = {
      pixels: 10000,
      distance: 1,
      splitPower: 10,
      colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    };
    const getColor = async () => {
      const color = await extractColors(imageElemet.src, options);
      const root = document.documentElement;
      root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
    };
    getColor();
    let image = images[params.id];
    if (!image) {
      image = defaultImages[params.id];
    }

    getPokemonInfo(image);
  }, [params.id, getPokemonInfo]);

  return (
    // <>
    //   {!isDataLoading && currentPokemon ? (
        <>
          {currentPokemonTab === pokemonTabs.description && <Description />}
          {currentPokemonTab === pokemonTabs.evolution && <Evolution />}
          {currentPokemonTab === pokemonTabs.locations && <Locations />}
          {currentPokemonTab === pokemonTabs.moves && <CapableMoves />}
        </>
      )
      //  : (
    //     <Loader />
    //   )}
    // </>
  // );
}

export default Wrapper(Pokemon);
