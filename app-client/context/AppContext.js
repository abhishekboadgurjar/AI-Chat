import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../api/axiosInstance";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) setUserToken(token);
    };
    loadToken();
  }, []);

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/auth/login", { email, password });
      const token = res.data.token;
      setUserToken(token);
      await AsyncStorage.setItem("token", token);
      return token;
    } catch (err) {
      throw err.response?.data || err.message;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUserToken(null);
    await AsyncStorage.removeItem("token");
  };

  const sendMessage = async (message) => {
    try {
      const res = await axiosInstance.post("/chat/ask", { message });
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  };

  const getHistory = async () => {
    try {
      const res = await axiosInstance.get("/chat/history");
      setHistory(res.data || []);
    } catch (err) {
      throw err.response?.data || err.message;
    }
  };

  return (
    <AppContext.Provider
      value={{
        userToken,
        loading,
        history,
        register,
        login,
        logout,
        sendMessage,
        getHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
