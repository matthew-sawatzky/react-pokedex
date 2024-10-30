import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { genericPokemonType, generatedPokemonType } from "../../utils/Types";

export const getPokemonData = createAsyncThunk(
    "pokemon/randomPokemon",
    async(pokemons: genericPokemonType[]) => {
        try{
            const pokemonsData: generatedPokemonType[] = [];
            for await (const pokemon of pokemons){
                const { data } = await axios.get(pokemon.url);
                console.log({data});
            }
        } catch(err){}
    }
)