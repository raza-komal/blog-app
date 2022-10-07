import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
 
  const [currUser, setCurrUser] =
    useState(
      JSON.parse(localStorage.getItem("user")) || null
    );
    //

  const login = async (data) => {
    const res = await axios.post("/users/signin", data);
    setCurrUser(res.data);
  };

  const signup = async (data) => {
    const res = await axios.post("/users/signup", data);
    setCurrUser(res.data);
  };
  const logout = async () => {
   await axios.post("/users/signout");
    setCurrUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currUser));
  }, [currUser]);

  return (
    <AuthContext.Provider value={{ currUser, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
