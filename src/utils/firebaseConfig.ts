import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";


const FirebaseConfig = {
  apiKey: "AIzaSyDfhBrAdfd8r2DyxPl_ASmJVlhqyLlIHMM",

  authDomain: "pokedex-77c38.firebaseapp.com",

  projectId: "pokedex-77c38",

  storageBucket: "pokedex-77c38.firebasestorage.app",

  messagingSenderId: "398909570021",

  appId: "1:398909570021:web:bbc7c53e29e2cd3e104d0c",

  measurementId: "G-MJ9XNCT133",
};

const app = initializeApp(FirebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
