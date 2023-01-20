import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LoginForm from '../../components/LoginForm'
import Trade from '../../components/Trade'

type Props = {

}

export type trade = {
    id: number
    pair: string
    leverage: number
    size: number
    status: string
    entryPrice: number
    side: 'buy' | 'sell'
    traders?: {
        id: number
        name: string
        url: string
    }
}

const TradesPage = (props: Props) => {
    const session = useSession()
    const supabase = useSupabaseClient()
    const [trades, setTrades] = useState<trade[]>([])
    const [tradesLoading, setTradesLoading] = useState(false)
    const filteredTrades = trades.filter((trade, index, self) => index === self.findIndex((t) => t.pair === trade.pair && t.side === trade.side && t.status === "filled"));

    useEffect(() => {
        setTradesLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/trades/open`).then(res => res.json().then(data => {
            setTrades(data)
            setTradesLoading(false)
        }))
    }, [])

    return (
        <div>
            <Head>
                <title>TeaSquare - Compte</title>
            </Head>
            {!session ? (
                <LoginForm supabaseClient={supabase} />
            ) : (
                <div className='bg-main bg-cover backdrop-blur-lg h-screen'>
                    <div className='flex flex-row items-center justify-center'>
                        <Link href='/'>
                            <h1 className="font-space font-semibold text-6xl text-white text-center my-12">TeaSquare Dashboard</h1>
                        </Link>
                    </div>
                    <div className="flex justify-between">
                        <div className="bg-gray-700 rounded-2xl mx-16 p-6 w-full">
                            <h2 className='text-white font-satoshi text-3xl'>Liste des trades ouverts</h2>
                            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                            {tradesLoading ? <p className='text-white font-satoshi'>Chargement...</p> :
                                filteredTrades.length > 0 ? filteredTrades.map((trade, i) => (<Trade key={i} trade={trade} />)) :
                                    <p className='text-white font-satoshi'>Aucun trade ouvert</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TradesPage