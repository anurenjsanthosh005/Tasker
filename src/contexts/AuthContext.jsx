import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(() => {
    const stored = localStorage.getItem("USER_DETAILS");
    return stored ? JSON.parse(stored) : null;
  });

  const userLogin = (data) => {
    localStorage.setItem("USER_DETAILS", JSON.stringify(data));
    setLogin(data);
  };

  const userLogout = () => {
    setLogin(null);
    localStorage.setItem("USER_DETAILS", null);
  };
  const value = useMemo(() => ({ login, userLogin, userLogout }), [login]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
