import React from 'react'
import { isAfter, sub, set } from 'date-fns'
import { balance, trade } from '../pages/accounts/[id]'

type Props = {
    trades: trade[]
    balance: balance | undefined
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
    const roi = pnlSum / invested * 100 || 0
    return { roi, pnlSum }
}

const Stats = ({ trades, balance }: Props) => {
    const now = set(Date.now(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
    const monthlyTrades = trades.filter(trade => isAfter(new Date(trade.updatedAt), sub(now, { months: 1 })))
    const weeklyTrades = trades.filter(trade => isAfter(new Date(trade.updatedAt), sub(now, { weeks: 1 })))
    const dailyTrades = trades.filter(trade => isAfter(new Date(trade.updatedAt), now))
    const { roi, pnlSum } = getPNLROI(trades)
    const { roi: monthlyRoi, pnlSum: monthlyPNL } = getPNLROI(monthlyTrades)
    const { roi: weeklyRoi, pnlSum: weeklyPNL } = getPNLROI(weeklyTrades)
    const { roi: dailyRoi, pnlSum: dailyPNL } = getPNLROI(dailyTrades)
    const redGradient = 'from-red-400 to-orange-500'
    const greenGradient = 'from-green-400 to-green-600'
    return (
        <div className='flex justify-between items-center '>
            <div>
                <h4 className='font-satoshi text-xl text-white'>Daily</h4>
                <p className={`${dailyPNL > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>PNL {dailyPNL.toFixed(2)}$</p>
                <p className={`${dailyRoi > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>ROI {dailyRoi.toFixed(2)}%</p>
            </div>
            <div>
                <h4 className='font-satoshi text-xl text-white'>Weekly</h4>
                <p className={`${weeklyPNL > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>PNL {weeklyPNL.toFixed(2)}$</p>
                <p className={`${weeklyRoi > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>ROI {weeklyRoi.toFixed(2)}%</p>
            </div>
            <div>
                <h4 className='font-satoshi text-xl text-white'>Monthly</h4>
                <p className={`${monthlyPNL > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>PNL {monthlyPNL.toFixed(2)}$</p>
                <p className={`${monthlyRoi > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>ROI {monthlyRoi.toFixed(2)}%</p>
            </div>
            <div>
                <h4 className='font-satoshi text-xl text-white'>All</h4>
                {balance && <p className={`${balance.pnl > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>PNL {balance.pnl.toFixed(2)}$</p>}
                <p className={`${roi > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>ROI {roi.toFixed(2)}%</p>
            </div>
        </div>
    )
}

export default Stats