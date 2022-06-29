import React, { useState,useEffect } from "react";
import { useRouter } from 'next/router';
import {app } from '../config/firebase'
import { getAuth, onAuthStateChanged,signOut} from "firebase/auth";

const auth = getAuth();

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const router  = useRouter();
  const [loading, setLoading] = useState(true) 
  const [user, setUser] = useState({});
  const [allFretes, setAllFretes] = useState([]);

  useEffect(()=> {
    getUser();
    if(user){
     getAllFretes(user.uid);
    }
    return; 
   },[user])
 

 //vereficar usuer logado 
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
  
  async function logout() {
    return await signOut(auth).then(()=>{
      setUser({});
      setLoading(true);
    })
  }

  //api frete
  const addfrete = async (id,contato,cliente,price,distance,formPgt,rota) => {     
    await app.firestore().collection('fretes').doc()
    .set({            
        postedBy:id,
        contato,
        cliente,
        driver: '',                  
        price,
        distance,
        status : 'notificando',
        obs: '',
        formPgt,                                  
        rota,
        created: new Date()
    })
    .then(() => {                   
        router.push('/dashboard')
    })
      .catch((error) => {console.log(error)});  
  }

  const getAllFretes = async (id) => {                   
    app.auth().onAuthStateChanged(user=>{
      if(user){
        app.firestore().collection('fretes').where('postedBy', '==', user.uid)//.orderBy('created', 'desc')
          .onSnapshot((snap) => {
              const docs = snap.docs.map(doc=>({
                  id: doc.id,
                  ...doc.data()
              }));              
              setAllFretes(docs)         
        })  
      }
    })        
  }

 
  
  return (
    <AppContext.Provider value={{           
      user,
      loading,
      getUser,
      logout,
      addfrete,
      getAllFretes,
      allFretes 
      
    }}>{children}</AppContext.Provider>
  );
}