import { pokemonStatType, pokemonTypeInterface } from "../../utils/Types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setToast } from "../slices/AppSlice";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/FirebaseConfig";
import { pokemonStatsType, userPokemonsType } from "../../utils/Types";
import { RootState } from "../store";

export const addPokemonToList = createAsyncThunk(
    "pokemon/addPokemon",
    async(pokemon:{
        id:number;
        name:string;
        types:pokemonTypeInterface[] | string[];
        stats?: pokemonStatsType[];
    },{getState, dispatch}) => {
        try{
            const{
                app: {userInfo},
                pokemon: {userPokemons},
            } = getState() as RootState;
            if(!userInfo?.email){
                return dispatch(setToast("Login to add Pokemon to your list."));
            }
            const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
                return userPokemon.name === pokemon.name;
            })
            if(index === -1){
                let types: string[] = [];
                types = pokemon.types as string[];
                await addDoc(pokemonListRef,{
                    pokemon:{id:pokemon.id, name:pokemon.name, types},
                })
                // await dispatch(getUserPokemons());
            } else{
                return dispatch(setToast(`${pokemon.name} is already in your list.`));
            }
        } catch (err) {
            console.log(err);
        }
    }
)