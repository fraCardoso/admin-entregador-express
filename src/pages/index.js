import {useContext,useEffect} from 'react'
import Spinner from '../components/Spinner';
import { AppContext } from '../config/AppContext'
import Link  from 'next/link'

export default function Home() {
  const {user, loading, getUser} = useContext(AppContext);

  useEffect(()=> {    
    getUser(); 
    return;
  },[user])

  return loading == false ? (
    <div className='flex p-2'>
      <Link href="/dashboard">
        <button className="flex px-4 py-4 bg-yellow-500 w-full">
          <a className="text-gray-800">Corrida em andamento! acompanhar?</a>
        </button> 
      </Link>   
    </div>
  ) : <Spinner />
}
