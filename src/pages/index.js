import {useContext } from 'react'
import { AppContext } from '../config/AppContext'

export default function Home() {
  const {user,loading} = useContext(AppContext);
  return loading == false ?(
    <div>
      <h1 className="text-3xl font-bold text-green-500">
        Hello world! - {user}
      </h1>     
    </div>
  ): <h4>Loading..</h4>
}
