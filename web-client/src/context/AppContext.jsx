import React, { createContext, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(
    localStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Register
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUserToken(res.data.token);
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUserToken(null);
    localStorage.removeItem("token");
  };

  // Ask Chat
  const sendMessage = async (message) => {
    const res = await axiosInstance.post("/chat/ask", { message });
    return res.data.reply;
  };

  // Get History
  const getHistory = async () => {
    const res = await axiosInstance.get("/chat/history");
    setHistory(res.data || []);
  };

  return (
    <AppContext.Provider
      value={{
        userToken,
        register,
        login,
        logout,
        sendMessage,
        history,
        getHistory,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
