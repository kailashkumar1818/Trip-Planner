import { createContext, useEffect, useState } from "react";
import { fetchProfile, login, register } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      const token = localStorage.getItem("trip_planner_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await fetchProfile();
        setUser(profile);
      } catch (error) {
        localStorage.removeItem("trip_planner_token");
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, []);

  const persistAuth = ({ token, user: profile }) => {
    localStorage.setItem("trip_planner_token", token);
    setUser(profile);
  };

  const loginUser = async (payload) => {
    const result = await login(payload);
    persistAuth(result);
    return result;
  };

  const registerUser = async (payload) => {
    const result = await register(payload);
    persistAuth(result);
    return result;
  };

  const logout = () => {
    localStorage.removeItem("trip_planner_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
