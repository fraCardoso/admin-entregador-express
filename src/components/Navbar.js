import{ useContext} from 'react'
import { AppContext } from '../config/AppContext'
import Link from 'next/link';

export default function Navbar() {
  const {logout,user } = useContext(AppContext)
  
    return (
        <nav className="px-2 sm:px-4 py-2.5 dark:bg-gray-800 h-20">
            <div className="container flex flex-wrap justify-between items-center mt-2 mx-auto">
                <div className="flex items-center">
                  <img src="/images/logo.svg" className="mr-3 h-10 sm:h-9" alt="Flowbite Logo" />
                </div>
                <div className="flex flex-grow justify-end items-center">
                  {user ?<>                   
                   <p>Olá {user.displayName}</p>
                   <button  onClick={()=> logout()} className='ml-2 mr-2' >| Sair</button>
                   </>
                   :
                   <Link href='/sobre' ><a>Quem somos?</a></Link>
                  }
                </div>
            </div>
        </nav>
    )
}