import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { query, addDoc, getDocs, where } from "firebase/firestore";
import { firebaseAuth, usersRef } from "../utils/FirebaseConfig";
import { useAppDispatch } from "../app/hooks";
import { setUserStatus } from "../app/slices/AppSlice";

function Login() {
  const dispatch = useAppDispatch();
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {user:{email, uid },
  } = await signInWithPopup(firebaseAuth, provider);
  if(email){
    const firestoreQuery = query(usersRef, where("uid", "==", uid));
    const fetchedUser = await getDocs(firestoreQuery);
    if(fetchedUser.docs.length === 0){
      await addDoc(usersRef, {uid, email});
    }
    dispatch(setUserStatus({email}))
  }
  };
  return (
    <div className="login">
      <button className="login-btn" onClick={handleLogin}>
        <FcGoogle />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
