import React, { useState, ReactNode } from "react";
import UserContext from "./userContext";

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    
    const login = (id: string, name: string) => {
        setUser({ id, name });
      };

  return (
    <UserContext.Provider  value={{ user, setUser,  login }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
