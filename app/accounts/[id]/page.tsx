import React from 'react'
import Account from '../Account'
import { isAfter, sub, set } from 'date-fns'

type trade = {
    id: number
    pair: string
    leverage: number
    size: number
    entryPrice: number
    side: 'buy' | 'sell'
    closingPrice: number
    open: boolean
    percent: number
    win: boolean
    createdAt: number
    credentialId: number
}

const getAccount = async (accountId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}`, { next: { revalidate: 10 } })
    const data = await res.json()
    return data
}

const getTrades = async (accountId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trades/account/${accountId}`, { next: { revalidate: 10 } })
    const data = await res.json()
    return data as trade[]
}

const getPNLROI = (trades: trade[]) => {
    let pnlSum = 0
    let invested = 0
    trades.map((trade) => {
        if (!trade.open) {
            const fees = trade.size * trade.entryPrice * 0.0006 + trade.size * trade.closingPrice * 0.0006
            const pnl = trade.size / trade.leverage * trade.entryPrice * trade.percent / 100 - fees
            invested += trade.size * trade.entryPrice / trade.leverage
            pnlSum += pnl
        }
    })
    const roi = (pnlSum / invested * 100).toFixed(2)
    return { roi, pnlSum }
}

const page = async ({ params }: any) => {
    const account = await getAccount(params.id)
    const trades = await getTrades(params.id)
    const now = set(Date.now(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
    const monthlyTrades = trades.filter(trade => isAfter(new Date(trade.createdAt), sub(now, { months: 1 })))
    const weeklyTrades = trades.filter(trade => isAfter(new Date(trade.createdAt), sub(now, { weeks: 1 })))
    const dailyTrades = trades.filter(trade => isAfter(new Date(trade.createdAt), now))
    const { roi, pnlSum } = getPNLROI(trades)
    const { roi: monthlyRoi, pnlSum: monthlyPNL } = getPNLROI(monthlyTrades)
    const { roi: weeklyRoi, pnlSum: weeklyPNL } = getPNLROI(weeklyTrades)
    const { roi: dailyRoi, pnlSum: dailyPNL } = getPNLROI(dailyTrades)
    const redGradient = 'from-red-400 to-orange-500'
    const greenGradient = 'from-green-400 to-green-600'

    return (
        <div className="flex justify-between">
            <div className="bg-gray-700 rounded-2xl mx-16 p-6 w-full">
                <h2 className='text-white font-satoshi text-3xl'>Détails du compte</h2>
                <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                <Account account={account} />
            </div>
            <div className='bg-gray-700 rounded-2xl mx-16 p-6 w-1/3'>
                <h2 className='text-white font-satoshi text-3xl'>Statistiques</h2>
                <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                <div className='flex justify-between items-center '>
                    <div>
                        <h4 className='font-satoshi text-xl text-white'>Daily</h4>
                        <p className={`${dailyPNL > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>PNL {dailyPNL.toFixed(2)}$</p>
                        <p className={`${Number(dailyRoi) > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>ROI {dailyRoi}%</p>
                    </div>
                    <div>
                        <h4 className='font-satoshi text-xl text-white'>Weekly</h4>
                        <p className={`${weeklyPNL > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>PNL {weeklyPNL.toFixed(2)}$</p>
                        <p className={`${Number(weeklyRoi) > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>ROI {weeklyRoi}%</p>
                    </div>
                    <div>
                        <h4 className='font-satoshi text-xl text-white'>Monthly</h4>
                        <p className={`${monthlyPNL > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>PNL {monthlyPNL.toFixed(2)}$</p>
                        <p className={`${Number(monthlyRoi) > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>ROI {monthlyRoi}%</p>
                    </div>
                    <div>
                        <h4 className='font-satoshi text-xl text-white'>All</h4>
                        <p className={`${pnlSum > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>PNL {pnlSum.toFixed(2)}$</p>
                        <p className={`${Number(roi) > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>ROI {roi}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page