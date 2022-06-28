import { useContext } from 'react'
import { AppContext } from '../config/AppContext'
import Link from 'next/link';


export default function Dashboard() {
    const { allFretes } = useContext( AppContext );

    const Add = () => {
        return(
            <Link href="/">
                <button  
                    className="bg-green-400 hover:bg-green-800
                    text-white px-3 py-3 mt-2">
                        Adicionar Frete
                </button>           
            </Link>
        )
    }

    return(
        <div>
            <div className="text-end p-2">
                <Add />
            </div>
            <div className='p-2'>
                {allFretes && allFretes.length == 0 ?<>
                    <h3 className='mb-5'>Não exite corridas em andamento!</h3>
                    <Link href="/"><a>
                        <button className="bg-slate-800 hover:bg-slate-500 w-full
                            text-white px-4 py-4 mt-7" >Adicionar frete
                        </button>
                    </a></Link> 
                    </>
                    :
                    <h4>Corridas em andamentos:</h4>      
                }
            {allFretes && allFretes.map((f,key)=>(
                <div key={key} className="px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mt-5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                            {new Date(f.created.seconds * 1000).toLocaleDateString("pt-br")}{' - '} 
                            {new Date(f.created.seconds * 1000).toLocaleTimeString("pt-br")}     
                        </span> 
                        <p className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-orange-400 rounded cursor-pointer">{f.status}</p>
                    </div> 
                    <div className="mt-2">
                        {f.rota.length == 2 &&
                        <p className="text-2xl font-bold text-gray-700 dark:text-white">Simples coleta entrega</p>}
                        {f.rota.length > 2 &&
                        <p className="text-2xl font-bold text-gray-700 dark:text-white">Rota com {f.rota.length} pontos</p>}  
                        {f.rota.map((r,i)=>(
                            <div key={i}>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">{key+1} - {r.location}</p>
                            </div>
                        ))}
                    </div> 
                    <div className="flex items-center justify-between mt-4">
                        <p  className="text-blue-600 dark:text-blue-400 hover:underline">Read more ⟶</p> 
                        <div className="flex items-center">                
                        <p className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">Procurando entregador...</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>           
        </div>
    )
}