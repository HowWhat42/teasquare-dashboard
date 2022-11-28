import { GetServerSideProps } from 'next'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Account from '../../components/Account'
import Stats from '../../components/Stats'
import Link from 'next/link'
import LoginForm from '../../components/LoginForm'

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

type Props = {
    account: any
    trades: trade[]
}

const page = ({ account, trades }: Props) => {
    const session = useSession()
    const supabase = useSupabaseClient()
    return (
        <div>
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
                            <h2 className='text-white font-satoshi text-3xl'>Détails du compte</h2>
                            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                            <Account account={account} />
                        </div>
                        <div className='bg-gray-700 rounded-2xl mx-16 p-6 w-1/3'>
                            <h2 className='text-white font-satoshi text-3xl'>Statistiques</h2>
                            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
                            <Stats trades={trades} />
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default page

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${params?.id}`)
    const account = await res.json()
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trades/account/${params?.id}`)
    const trades = await res2.json()

    return {
        props: {
            account,
            trades
        }
    }
}