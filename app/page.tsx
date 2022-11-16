import Account from "./accounts/Account"
import CreateAccount from "./accounts/CreateAccount"
import CreateTrader from "./traders/CreateTrader"
import Trader from "./traders/Trader"

const getAccounts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, { cache: 'no-store' })
    const data = await res.json()
    return data as any[]
}

const getTraders = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders`, { cache: "no-store" })
    const data = await res.json()
    return data as any[]
}

const HomePage = async () => {
    const accounts = await getAccounts()
    const traders = await getTraders()

    return (
        <div className='flex justify-between z-10'>
            <div className="bg-gray-700 rounded-2xl mx-16 p-6">
                <h3 className="text-4xl font-space text-white">Liste des comptes Bybit</h3>
                <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                <CreateAccount />
                <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                <div className="flex flex-col">
                    {accounts?.map((account) => (
                        <Account key={account.id} account={account} />
                    ))}
                </div>
            </div>
            <div className="bg-gray-700 rounded-2xl mx-16 p-6">
                <h3 className="text-4xl font-space text-white">Liste des traders Binance</h3>
                <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                <CreateTrader />
                <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                <div className="flex flex-col">
                    {traders?.map((trader) => (
                        <Trader key={trader.id} trader={trader} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage