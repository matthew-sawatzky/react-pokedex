import { doc, deleteDoc } from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonListRef } from "../../utils/FirebaseConfig";

export const removePokemon = createAsyncThunk("pokemon/remove", async ({id}: {id: string}) => {
    try{
        await deleteDoc(doc(pokemonListRef, id));
    } catch(err){
        console.log(err);
    }
}
);