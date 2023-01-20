import { useRouter } from 'next/navigation'
import React from 'react'
import { position } from '../pages/accounts/[id]'

type Props = {
    position: position
}

const Position = ({ position }: Props) => {
    const router = useRouter();

    const onClose = async () => {
        if (window.confirm(`Êtes vous sûr de clôturer le trade ${position.symbol} ?`)) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trades/close/${position.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
            router.refresh()
        }
    }

    const redGradient = 'from-red-400 to-orange-500'
    const greenGradient = 'from-green-400 to-green-600'
    return (
        <div className='flex items-center text-sm lg:text-lg text-white font-satoshi'>
            <p className='w-16 mr-2 text-md lg:text-xl'>{position.marginMode}</p>
            <p className='w-24 mr-4 text-md lg:text-xl'>Levier {position.leverage}x</p>
            <p className={`w-24 mr-3 ${position.side === 'Buy' ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>{position.symbol}</p>
            <p className={`w-20 mr-6 text-right ${position.percentage > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>{position.percentage}%</p>
            <p className='w-24 text-md lg:text-xl'>{position.size}</p>
            <p className='w-20 text-md lg:text-xl'>~{Math.round(position.value)}$</p>
            <p className='ml-3 text-md lg:text-xl'>{position.trader}</p>
            {position?.id && <div>
                <button className="m-2 p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br" onClick={onClose}>
                    <span className="block text-black rounded-full px-2 py-1 lg:px-4 lg:py-2 bg-white hover:bg-transparent hover:text-white transition">Clôturer</span>
                </button>
            </div>}
        </div>
    )
}

export default Position