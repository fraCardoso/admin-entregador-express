import Link  from 'next/link'

export default function Dashboard() {

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

            <h3>Dashboard</h3>
        </div>
    )
}