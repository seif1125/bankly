 
'use client'
import { createContext, useContext } from "react";
import { User } from "@/types";

export const UserContext = createContext<User | null>(null);

export const UserProvider = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);  
