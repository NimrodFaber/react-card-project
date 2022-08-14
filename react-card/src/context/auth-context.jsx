import { createContext, useContext, useEffect, useState } from "react";
import usersService from "../services/usersService";

export const AuthContext = createContext(null);
AuthContext.displayName = "auth-context";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const refreshUser = () => {
    setUser(usersService.getUser());
  };
  const createUser = async (user) => {
    const createUser = await usersService.createUser(user);
    refreshUser();
    return createUser;
  };
  const logIn = async (credential) => {
    const logIn = await usersService.logInUser(credential);
    refreshUser();
    return logIn;
  };

  const logOut = () => {
    usersService.logOut();
    refreshUser();
  };

  useEffect(() => {
    refreshUser();
  }, []);
  return (
    <AuthContext.Provider value={{ logOut, logIn, createUser, user }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
