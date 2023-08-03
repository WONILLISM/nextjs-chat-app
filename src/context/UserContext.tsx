"use client";
import React, { Dispatch, ReactNode, createContext, useState } from "react";

interface User {
  email: string;
  image: string;
  name: string;
}

const defaultUser: User = {
  email: "",
  image: "",
  name: "",
};

export const UserContext = createContext<User>(defaultUser);

export const UserDispatchContext = createContext<Dispatch<User> | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={setUser}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
