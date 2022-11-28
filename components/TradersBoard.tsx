import CreateTrader from "../components/CreateTrader"
import Trader from "../components/Trader"

type Props = {
    traders: any[]
}

const TradersBoard = ({ traders }: Props) => {
    return (
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
    )
}

export default TradersBoard