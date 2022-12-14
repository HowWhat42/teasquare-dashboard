import { useState, useEffect } from 'react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../../components/Account'
import Stats from '../../components/Stats'
import Link from 'next/link'
import Head from "next/head"
import LoginForm from '../../components/LoginForm'
import Position from '../../components/Position'

export type trade = {
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
    updatedAt: number
    credentialId: number
}

export type balance = {
    total: number
    equity: number
    unrealised: number
    pnl: number
}

export type position = {
    symbol: string
    size: number
    leverage: number
    value: number,
    side: 'Buy' | 'Sell'
}

type Props = {
    account: any
    params: any
}

const Page = ({ account, params }: Props) => {
    const session = useSession()
    const supabase = useSupabaseClient()
    const redGradient = 'from-red-400 to-orange-500'
    const greenGradient = 'from-green-400 to-green-600'
    const [balance, setBalance] = useState<balance | undefined>()
    const [positions, setPositions] = useState<position[] | []>([])
    const [trades, setTrades] = useState<trade[] | []>([])
    const [balanceLoading, setBalanceLoading] = useState(false)
    const [positionLoading, setPositionLoading] = useState(false)
    const [tradesLoading, setTradesLoading] = useState(false)

    useEffect(() => {
        setBalanceLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${params.id}/balance`).then(res => res.json().then(data => {
            setBalance(data)
            setBalanceLoading(false)
        }))
        setPositionLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${params.id}/positions`).then(res => res.json().then(data => {
            setPositions(data)
            setPositionLoading(false)
        }))
        setTradesLoading(true)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/trades/account/${params.id}`).then(res => res.json().then(data => {
            setTrades(data)
            setTradesLoading(false)
        }))
    }, [params.id])

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
                            <div className='flex justify-between'>
                                <h2 className='text-white font-satoshi text-3xl'>Détails du compte</h2>
                                {balanceLoading ? <p className='text-white font-satoshi'>Loading</p> : balance && <div className='text-right'>
                                    <p className='text-white font-satoshi'>Total: {balance.total.toFixed(2)}$</p>
                                    <p className='text-white font-satoshi'>Equité: {balance.equity.toFixed(2)}$</p>
                                    <p className={`${balance.unrealised > 0 ? greenGradient : redGradient} bg-gradient-to-br bg-clip-text text-transparent`}>PNL non réalisé: {balance.unrealised.toFixed(2)}$</p>
                                </div>}
                            </div>
                            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                            <Account account={account} />
                            {positionLoading ? <p className='text-white font-satoshi'>Loading</p> : positions.map((position, i) => <Position key={i} position={position} />)}
                        </div>
                        <div className='bg-gray-700 rounded-2xl mx-16 p-6 w-1/3'>
                            <h2 className='text-white font-satoshi text-3xl'>Statistiques</h2>
                            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                            {tradesLoading ? <p className='text-white font-satoshi'>Loading</p> : <Stats trades={trades} balance={balance} />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page

export const getStaticPaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`)
    const data = await res.json()

    const paths = data.map((account: any) => {
        return {
            params: { id: account.id.toString() }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const id = context.params.id
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`)
    const account = await res.json()

    return {
        props: {
            account,
            params: context.params
        }
    }
}