import {useContext,useEffect} from 'react'
import Spinner from '../components/Spinner';
import { AppContext } from '../config/AppContext'
import AddFrete from '../components/AddFrete'
import Link  from 'next/link'

export default function Home() {
  const {user, loading, getUser,getAllFretes, allFretes} = useContext(AppContext);

  useEffect(()=> {    
    getUser();
    if(user){
      getAllFretes(user.uid);
     }
    return;
  },[user])

  return loading == false ? (
    <div className='p-4'>
      {allFretes && allFretes.length > 0 && 
      <Link href="/dashboard">
        <button className="flex px-4 py-4 bg-yellow-500 w-full">
          <a className="text-gray-800">Corrida em andamento! acompanhar?</a>
        </button> 
      </Link>} 
      <AddFrete />
    </div>
  ) : <Spinner />
}
