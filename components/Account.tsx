import { useState } from 'react'
import { useRouter } from "next/navigation"
import Link from 'next/link'

type Props = {
    account: {
        id: number,
        name: string,
        active: boolean,
        maxLeverage: number,
        bankrollPercentage: number,
    }
}

const Account = ({ account }: Props) => {
    const router = useRouter();
    const { id, name, active, maxLeverage, bankrollPercentage } = account || {}
    const [leverage, setLeverage] = useState(maxLeverage)
    const [bankroll, setBankroll] = useState(bankrollPercentage)

    const onChange = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}/active`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ active: !active }),
        })
        router.refresh()
    }

    const onSubmit = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ maxLeverage: leverage, bankrollPercentage: bankroll }),
        })
        router.refresh()
    }

    const onDelete = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, { method: "DELETE" })
        router.refresh()
    }

    return (
        <div className='flex justify-between items-center text-white font-satoshi'>
            <div className='w-10'><p className='text-xl'>{id}</p></div>
            <Link href={`accounts/${id}`} className='w-50'>
                <p className='text-xl from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br bg-clip-text text-white hover:text-transparent transition cursor-pointer'>{name}</p>
            </Link>
            <div className='w-20 mx-6'>
                <label htmlFor="active">Bot</label>
                <input className='ml-2' name='active' type="checkbox" defaultChecked={active} onChange={onChange} />
            </div>
            <div className='flex flex-col text-center'>
                <label htmlFor="maxLeverage">Levier max</label>
                <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-4 p-1 w-30">
                    <input name='maxLeverage' className='rounded-full p-2 text-black w-full' type="number" value={leverage} onChange={(e) => setLeverage(Number(e.target.value))} />
                </div>
            </div>
            <div className='flex flex-col text-center'>
                <label htmlFor="bankrollSize">Taille de position (en %)</label>
                <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-4 p-1 w-30">
                    <input name='bankrollSize' className='rounded-full p-2 text-black w-full' type="number" value={bankroll} onChange={(e) => setBankroll(Number(e.target.value))} />
                </div>
            </div>
            <div className='mt-5'><button className="m-4 p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br" onClick={onSubmit}>
                <span className="block text-black rounded-full px-4 py-2 bg-white hover:bg-transparent hover:text-white transition">Valider</span>
            </button></div>
            <div className='mt-5'><button className="m-4 p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br" onClick={onDelete}>
                <span className="block text-black rounded-full px-4 py-2 bg-white hover:bg-transparent hover:text-white transition">Supprimer</span>
            </button></div>
        </div>
    )
}

export default Account