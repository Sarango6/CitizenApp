// frontend/context/AuthProvider.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    // bootstrap token from storage
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setAuthToken(token);
          // fetch user
          const resp = await api.get("/me");
          setUser(resp.data);
        }
      } catch (err) {
        console.log("bootstrap error", err.message);
      } finally {
        setBootstrapped(true);
      }
    })();
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const resp = await api.post("/login", { email, password });
      const { token, user } = resp.data;
      await AsyncStorage.setItem("token", token);
      setAuthToken(token);
      setUser(user);
      return { ok: true };
    } catch (err) {
      console.log("signIn error", err.response?.data || err.message);
      return { ok: false, message: err.response?.data?.message || err.message };
    }
  };

  const signUp = async ({ name, email, password }) => {
    try {
      const resp = await api.post("/signup", { name, email, password });
      const { token, user } = resp.data;
      await AsyncStorage.setItem("token", token);
      setAuthToken(token);
      setUser(user);
      return { ok: true };
    } catch (err) {
      console.log("signUp error", err.response?.data || err.message);
      return { ok: false, message: err.response?.data?.message || err.message };
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, bootstrapped, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
