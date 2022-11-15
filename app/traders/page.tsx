import Trader from "./Trader"
import CreateTrader from "./CreateTrader"

const getTraders = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders`, { cache: "no-store" })
    const data = await res.json()
    return data as any[]
}

const TradersPage = async () => {
    const traders = await getTraders()

    return (
        <div>
            <h1>Traders</h1>
            <CreateTrader />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>URL</th>
                        <th>Telegram</th>
                        <th>Bybit</th>
                    </tr>
                </thead>
                <tbody>
                    {traders?.map((trader) => (
                        <Trader key={trader.id} trader={trader} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TradersPage