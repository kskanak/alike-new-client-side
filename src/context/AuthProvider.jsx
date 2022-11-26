import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setuser] = useState({});
  const [loader, setLoader] = useState(true);

  // sign up implement
  const signUp = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login implement
  const login = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update userProfile

  const profileUpdate = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // sign out implement
  const logOut = () => {
    localStorage.removeItem("AppointmentToken");
    setLoader(true);
    return signOut(auth);
  };

  // google sign in implement

  const googleSignIn = (googleProvider) => {
    return signInWithPopup(auth, googleProvider);
  };

  // password reset implements

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // onAuth change implement
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setuser(loggedUser);
      setLoader(false);
    });
    return () => {
      unSubscribe();
    };
  }, [auth]);
  const authInfo = {
    user,
    signUp,
    login,
    logOut,
    profileUpdate,
    loader,
    setLoader,
    googleSignIn,
    resetPassword,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
