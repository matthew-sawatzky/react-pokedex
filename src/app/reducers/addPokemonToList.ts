import { pokemonStatsType } from "../../utils/Types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonTypeInterface } from "../../utils/Types";
import { RootState } from "../store";
import { setToast } from "../../app/slices/AppSlice";
import { userPokemonsType } from "../../utils/Types";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/FirebaseConfig";

export const addPokemonToList = createAsyncThunk(
  "pokemon/addPokemon",
  async (
    pokemon: {
      id: number;
      name: string;
      types: pokemonTypeInterface[] | string[];
      stats?: pokemonStatsType[];
    },
    { getState, dispatch }
  ) => {
    try {
      const {
        app: { userInfo },
        pokemon: { userPokemons },
      } = getState() as RootState;
      if (!userInfo?.email) {
        return dispatch(
          setToast("Please login to add pokemon to your collection.")
        );
      }
      const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
        return userPokemon.name === pokemon.name;
      });
      if (index === -1) {
        let types: string[] = [];
        types = pokemon.types as string[];
        await addDoc(pokemonListRef, {
          pokemon: { id: pokemon.id, name: pokemon.name, types },
        });
        // await dispatch(getUserPokemons())
        return dispatch(setToast(`${pokemon.name} added to your collection.`));
      } else {
        return dispatch(
          setToast(`${pokemon.name} is already in your collection.`)
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
);
