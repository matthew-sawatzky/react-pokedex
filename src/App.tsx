import { useEffect } from "react";
import Background from "./components/Background";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import "./scss/index.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyList from "./pages/MyList";
import Search from "./pages/Search";
import Compare from "./pages/Compare";
import Pokemon from "./pages/Pokemon";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setUserStatus } from "./app/slices/AppSlice";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./utils/FirebaseConfig.ts";

function App() {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        dispatch(setUserStatus({ email: currentUser.email as string }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((message: string) => {
        toast(message, toastOptions);
      });
    }
  }, [toasts, dispatch]);

  return (
    <div className="main-container">
      <Background />
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <Routes>
            <Route element={<Search />} path="/search" />
            <Route element={<MyList />} path="/list" />
            <Route element={<Compare />} path="/compare" />
            <Route element={<Pokemon />} path="/pokemon/:id" />
            <Route element={<Navigate to="/pokemon/1" />} path="*" />
          </Routes>
          <Footer />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
