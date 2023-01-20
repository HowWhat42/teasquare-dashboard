import Link from "next/link"
import CreateTrader from "../components/CreateTrader"
import Trader from "../components/Trader"

type Props = {
    traders: any[]
}

const TradersBoard = ({ traders }: Props) => {
    return (
        <div className="bg-gray-700 rounded-2xl m-8 p-6">
            <div className="flex justify-between items-center">
                <h3 className="text-4xl font-space text-white">Liste des traders Binance</h3>
                <Link href={`/trades`}>
                    <div className="p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br">
                        <span className="block text-black rounded-full px-2 py-1 lg:px-4 lg:py-2 bg-white hover:bg-transparent hover:text-white transition">Trades</span>
                    </div>
                </Link>
            </div>
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
            <CreateTrader />
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
            <div className="flex flex-col">
                {traders?.map((trader) => (
                    <Trader key={trader.id} trader={trader} />
                ))}
            </div>
        </div>
    )
}

export default TradersBoard