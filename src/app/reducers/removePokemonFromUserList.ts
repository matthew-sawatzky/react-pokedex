import { pokemonListRef } from "../../utils/FirebaseConfig"
import { deleteDoc, doc } from "firebase/firestore"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const removePokemon = createAsyncThunk(
  "pokemon/remove",
  async ({id}: {id: string}) => {
    try{
      await deleteDoc(doc(pokemonListRef, id));
      return { id };
    } catch(err) {
      console.log(err);
    }
  }
)