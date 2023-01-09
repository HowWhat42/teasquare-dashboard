import React from 'react'
import { position } from '../pages/accounts/[id]'

type Props = {
    position: position
}

const Position = ({ position }: Props) => {
    const redGradient = 'from-red-400 to-orange-500'
    const greenGradient = 'from-green-400 to-green-600'
    return (
        <div className='flex text-sm lg:text-lg text-white font-satoshi'>
            <p className='w-16 mr-2 text-md lg:text-xl'>{position.marginMode}</p>
            <p className='w-24 mr-4 text-md lg:text-xl'>Levier {position.leverage}x</p>
            <p className={`w-24 mr-3 ${position.side === 'Buy' ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>{position.symbol}</p>
            <p className={`w-20 mr-6 text-right ${position.percentage > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>{position.percentage}%</p>
            <p className='w-24 text-md lg:text-xl'>{position.size}</p>
            <p className='w-20 text-md lg:text-xl'>~{Math.round(position.value)}$</p>
            <p className='ml-3 text-md lg:text-xl'>{position.trader}</p>
        </div>
    )
}

export default Position