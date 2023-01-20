import { useRouter } from 'next/navigation';
import { useState } from 'react'

type Props = {}

const TradingPanel = (props: Props) => {
    const router = useRouter();

    const [symbol, setSymbol] = useState('')
    const [leverage, setLeverage] = useState(1)
    const [bankroll, setBankroll] = useState(1)
    const [marginMode, setMarginMode] = useState(true)
    const [side, setSide] = useState(true)
    const [limit, setLimit] = useState<number>()
    const [takeProfit, setTakeProfit] = useState<number>()
    const [stopLoss, setStopLoss] = useState<number>()


    const onSubmit = async () => {
        if (window.confirm(`Êtes vous sûr d'envoyer le trade ${symbol} avec les paramètres suivant : \n - Levier : ${leverage}x \n - Mode : ${marginMode ? "Isolé" : "Croisé"} \n - Side : ${side ? 'LONG' : 'SHORT'} \n - Taille position : ${bankroll}% \n - Limit : ${limit} \n - Take Profit : ${takeProfit} \n - Stop Loss : ${stopLoss}`)) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trades`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pair: symbol, side: side ? "buy" : "sell", leverage, isolated: marginMode, bankrollPercentage: bankroll, limitPrice: limit, tp: takeProfit, sl: stopLoss }),
            })
            router.refresh()
        }
    }

    return (
        <div className="bg-gray-700 rounded-2xl m-8 p-6">
            <h2 className="text-xl lg:text-2xl font-satoshi from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br bg-clip-text text-transparent">Trading Manuel</h2>
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
            <div className="flex items-center justify-between text-sm lg:text-lg text-white font-satoshi">
                <div className='flex flex-col items-center text-center w-40'>
                    <label htmlFor="symbol">Symbol</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-full">
                        <input name='symbol' className='rounded-full p-1 lg:p-2 text-black w-full' value={symbol} onChange={(e) => setSymbol(e.target.value.toUpperCase())} />
                    </div>
                </div>
                <div className="w-20">
                    <label htmlFor="marginMode">Isolé</label>
                    <input className="ml-2" name="marginMode" type='checkbox' defaultChecked={marginMode} onChange={(e) => setMarginMode(e.target.checked)} />
                </div>
                <div className="w-20">
                    <label htmlFor="side">LONG</label>
                    <input className="ml-2" name="side" type='checkbox' defaultChecked={side} onChange={(e) => setSide(e.target.checked)} />
                </div>
                <div className='flex flex-col items-center text-center'>
                    <label htmlFor="bankrollSize">Taille de position (en %)</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-[100px]">
                        <input name='bankrollSize' className='rounded-full p-1 lg:p-2 text-black w-full' type="number" value={bankroll} onChange={(e) => setBankroll(+e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col items-center text-center w-20'>
                    <label htmlFor="leverage">Levier</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-full">
                        <input name='leverage' className='rounded-full p-1 lg:p-2 text-black w-full' type="number" value={leverage} onChange={(e) => setLeverage(+e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col items-center text-center w-32'>
                    <label htmlFor="limit">Limite</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-full">
                        <input name='limit' className='rounded-full p-1 lg:p-2 text-black w-full' type="number" value={limit} onChange={(e) => setLimit(+e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col items-center text-center w-32'>
                    <label htmlFor="tp">TP</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-full">
                        <input name='tp' className='rounded-full p-1 lg:p-2 text-black w-full' type="number" value={takeProfit} onChange={(e) => setTakeProfit(+e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col items-center text-center w-32'>
                    <label htmlFor="sl">SL</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-full">
                        <input name='sl' className='rounded-full p-1 lg:p-2 text-black w-full' type="number" value={stopLoss} onChange={(e) => setStopLoss(+e.target.value)} />
                    </div>
                </div>
                <div className='mt-5'>
                    <button className="m-2 lg:m-4 p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br" onClick={onSubmit}>
                        <span className="block text-black rounded-full px-2 py-1 lg:px-4 lg:py-2 bg-white hover:bg-transparent hover:text-white transition">Envoyer</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TradingPanel