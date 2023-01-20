import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
    trader: {
        id: number
        name: string
        url: string
        telegram: boolean
        bybit: boolean
        minLeverage: number
        maxLeverage: number
        bankrollPercentage: number
        marginMode: string
    }
}

const Trader = ({ trader }: Props) => {
    const router = useRouter();
    const { id, name, url, telegram, bybit, minLeverage: baseMinLeverage, maxLeverage: baseMaxLeverage, bankrollPercentage, marginMode: margin } = trader || {}
    const [minLeverage, setMinLeverage] = useState(baseMinLeverage)
    const [maxLeverage, setMaxLeverage] = useState(baseMaxLeverage)
    const [bankroll, setBankroll] = useState(bankrollPercentage)
    const marginMode = margin === "isolated" ? true : false

    const setTelegram = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ telegram: !telegram }),
        })
        router.refresh()
    }

    const setBybit = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bybit: !bybit }),
        })
        router.refresh()
    }

    const setMarginMode = async () => {
        const newMode = marginMode ? "cross" : "isolated"
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ marginMode: newMode }),
        })
        router.refresh()
    }

    const onSubmit = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ minLeverage, maxLeverage, bankrollPercentage: bankroll }),
        })
        router.refresh()
    }

    const onDelete = async () => {
        if (window.confirm(`Êtes vous sûr de supprimer ${trader.name} ?`)) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders/${id}`, { method: "DELETE" })
            router.refresh()
        }
    }

    return (
        <div>
            <div className="font-satoshi flex justify-between items-center text-white">
                <div className="w-6"><p className="text-xl">{id}</p></div>
                <div className="w-40"><a className="text-xl from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br bg-clip-text text-white hover:text-transparent transition" href={url} target='_blank' rel="noreferrer">{name}</a></div>
                <div className="w-24 mr-1">
                    <label htmlFor="telegram">Telegram</label>
                    <input className="ml-2" name="telegram" type='checkbox' defaultChecked={telegram} onChange={setTelegram} />
                </div>
                <div className="w-16 mr-1">
                    <label htmlFor="bybit">Bybit</label>
                    <input className="ml-2" name="bybit" type='checkbox' defaultChecked={bybit} onChange={setBybit} />
                </div>
                <div className="w-16">
                    <label htmlFor="marginMode">Isolé</label>
                    <input className="ml-2" name="marginMode" type='checkbox' defaultChecked={marginMode} onChange={setMarginMode} />
                </div>
                <div className='flex flex-col text-center w-12 lg:w-20 mr-2'>
                    <label htmlFor="maxLeverage">Levier min</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-full">
                        <input name='maxLeverage' className='rounded-full p-1 lg:p-2 text-black w-full' type="number" value={minLeverage} onChange={(e) => setMinLeverage(+e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col text-center w-12 lg:w-20  mr-2'>
                    <label htmlFor="maxLeverage">Levier max</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-full">
                        <input name='maxLeverage' className='rounded-full p-1 lg:p-2 text-black w-full' type="number" value={maxLeverage} onChange={(e) => setMaxLeverage(+e.target.value)} />
                    </div>
                </div>
                <div className='flex flex-col text-center'>
                    <label htmlFor="bankrollSize">Taille de position (en %)</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-[150px]">
                        <input name='bankrollSize' className='rounded-full p-1 lg:p-2 text-black w-full' type="number" value={bankroll} onChange={(e) => setBankroll(+e.target.value)} />
                    </div>
                </div>
                <div className='mt-5'>
                    <button className="m-2 p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br" onClick={onSubmit}>
                        <span className="block text-black rounded-full px-2 py-1 lg:px-4 lg:py-2 bg-white hover:bg-transparent hover:text-white transition">Valider</span>
                    </button>
                </div>
                <div className="mt-5">
                    <button className="p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br" onClick={onDelete}>
                        <span className="block text-black px-4 py-2 rounded-full bg-white hover:text-white hover:bg-transparent transition">Supprimer</span>
                    </button>
                </div>
            </div>
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
        </div>
    )
}

export default Trader