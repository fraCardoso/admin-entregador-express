import React, { useState,useEffect } from "react";
import { useRouter } from 'next/router';
import {app } from '../config/firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const router  = useRouter();
  const [loading, setLoading] = useState(true) 
  const [user, setUser] = useState({});

  useEffect(()=> {
    getUser();    
    return; 
   },[user])
 

  async function getUser() {      
    return await  onAuthStateChanged(auth, (usuario) => {
      if (usuario) {       
        setUser(usuario); 
        setLoading(false);    
        router.push("/");  
      }else{
        router.push("/signin");
      }
    })
  }
 
  
  return (
    <AppContext.Provider value={{           
      user,
      loading,
      getUser 
      
    }}>{children}</AppContext.Provider>
  );
}