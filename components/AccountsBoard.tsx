import { useState } from 'react'
import { useRouter } from "next/navigation"
import CreateAccount from "../components/CreateAccount"
import Account from "../components/Account"

type Props = {
    accounts: any[]
}

const AccountsBoard = ({ accounts }: Props) => {
    const router = useRouter();
    const [leverage, setLeverage] = useState(0)
    const [bankroll, setBankroll] = useState(0)

    const onSubmit = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ maxLeverage: leverage, bankrollPercentage: bankroll }),
        })
        router.refresh()
    }

    return (
        <div className="bg-gray-700 rounded-2xl m-8 p-6 w-full">
            <h3 className="text-2xl lg:text-4xl font-space text-white">Liste des comptes Bybit</h3>
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
            <CreateAccount />
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
            <h2 className="text-xl lg:text-2xl font-satoshi from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br bg-clip-text text-transparent">Modification globale</h2>
            <div className="flex justify-between text-sm lg:text-lg text-white font-satoshi">
                <div className='flex flex-col text-center'>
                    <label htmlFor="maxLeverage">Levier max</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-full">
                        <input name='maxLeverage' className='rounded-full p-1 lg:p-2 text-black w-full' type="number" value={leverage} onChange={(e) => setLeverage(Number(e.target.value))} />
                    </div>
                </div>
                <div className='flex flex-col text-center'>
                    <label htmlFor="bankrollSize">Taille de position (en %)</label>
                    <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br mx-2 lg:mx-4 p-1 w-full">
                        <input name='bankrollSize' className='rounded-full p-1 lg:p-2 text-black w-full' type="number" value={bankroll} onChange={(e) => setBankroll(Number(e.target.value))} />
                    </div>
                </div>
                <div className='mt-4'>
                    <button className="m-2 lg:m-4 p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br" onClick={onSubmit}>
                        <span className="block text-black rounded-full px-2 py-1 lg:px-4 lg:py-2 bg-white hover:bg-transparent hover:text-white transition">Valider</span>
                    </button>
                </div>
            </div>
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
            <div className="flex flex-col">
                {accounts?.map((account) => (
                    <Account key={account.id} account={account} />
                ))}
            </div>
        </div>
    )
}

export default AccountsBoard