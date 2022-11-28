'use client'
import { useRouter } from "next/navigation"

type Props = {
    trader: {
        id: number
        name: string
        url: string
        telegram: boolean
        bybit: boolean
    }
}

const Trader = ({ trader }: Props) => {
    const router = useRouter();
    const { id, name, url, telegram, bybit } = trader || {}

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

    const onDelete = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders/${id}`, { method: "DELETE" })
        router.refresh()
    }

    return (
        <div className="font-satoshi flex justify-between items-center text-white">
            <div className="w-10"><p className="text-xl">{id}</p></div>
            <div className="w-40"><a className="text-xl from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br bg-clip-text text-white hover:text-transparent transition" href={url} target='_blank' rel="noreferrer">{name}</a></div>
            <div className="w-40 mx-6">
                <label htmlFor="telegram">Telegram</label>
                <input className="ml-2" name="telegram" type='checkbox' defaultChecked={telegram} onChange={setTelegram} />
            </div>
            <div className="w-36">
                <label htmlFor="bybit">Bybit</label>
                <input className="ml-2" name="bybit" type='checkbox' defaultChecked={bybit} onChange={setBybit} />
            </div>
            <div>
                <button className="m-4 p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br" onClick={onDelete}>
                    <span className="block text-black px-4 py-2 rounded-full bg-white hover:text-white hover:bg-transparent transition">Supprimer</span>
                </button>
            </div>
        </div>
    )
}

export default Trader