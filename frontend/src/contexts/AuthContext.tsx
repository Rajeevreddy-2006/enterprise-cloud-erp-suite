import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@/types/auth.types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: string,refreshToken: string,user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user,setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  },[]);
  
  const login = (accessToken:string,refreshToken:string,user:User) => {
    localStorage.setItem(
      "accessToken",
      accessToken
    );
    localStorage.setItem(
      "refreshToken",
      refreshToken
    );
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return( <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}> {children} </AuthContext.Provider>);
}