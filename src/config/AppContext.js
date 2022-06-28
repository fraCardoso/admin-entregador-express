import React, { useState } from "react";
import { useRouter } from 'next/router';

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const router  = useRouter(); 
  const [user, setUser] = useState('Francisco'); 
  
  return (
    <AppContext.Provider value={{           
      user
      
    }}>{children}</AppContext.Provider>
  );
}