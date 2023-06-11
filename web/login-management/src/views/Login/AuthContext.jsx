import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [myloginAPIRes, setLoginAPIRes] = useState(null);

  return (
    <AuthContext.Provider value={{ myloginAPIRes, setLoginAPIRes }}>
      {children}
    </AuthContext.Provider>
  );
};
