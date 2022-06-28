import {useContext,useEffect} from 'react'
import { AppContext } from '../config/AppContext'

export default function Home() {
  const {user, loading, getUser} = useContext(AppContext);

  useEffect(()=> {    
    getUser();   
    console.log(user) 
    return;
  },[user])

  return loading == false ? (
    <div>
      <h1 className="text-3xl font-bold text-green-500">
        Hello world! -{user && user.displayName}
      </h1>     
    </div>
  ) : <h4>Loading...</h4>
}
