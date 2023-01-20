import { trade } from '../pages/trades'

type Props = {
    trade: trade
}

const Trade = ({ trade }: Props) => {
    const onClose = async () => {
        if (window.confirm(`Êtes vous sûr de clôturer le trade ${trade.pair} ?`)) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trades/close/traders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    traderId: trade?.traders?.id,
                    pair: trade.pair
                })
            })
        }
    }

    const redGradient = 'from-red-400 to-orange-500'
    const greenGradient = 'from-green-400 to-green-600'
    return (
        <div className='flex items-center text-sm lg:text-lg text-white font-satoshi'>
            <p className='w-24 text-md lg:text-xl'>Levier {trade.leverage}x</p>
            <p className={`w-24 mr-3 ${trade.side === 'buy' ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>{trade.pair}</p>
            <p className='w-20 text-md lg:text-xl'>{trade.entryPrice}$</p>
            {trade?.traders ?
                <a className="text-xl from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br bg-clip-text text-white hover:text-transparent transition" href={trade.traders.url} target='_blank' rel="noreferrer">{trade.traders.name}</a>
                : <p className='ml-3 text-md lg:text-xl'>Trade Manuel</p>}
            <div>
                <button className="m-2 p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br" onClick={onClose}>
                    <span className="block text-black rounded-full px-2 py-1 lg:px-4 lg:py-2 bg-white hover:bg-transparent hover:text-white transition">Clôturer globale</span>
                </button>
            </div>
        </div>
    )
}

export default Trade