import { GetServerSideProps } from "next"
import Link from "next/link"
import Head from "next/head"
import AccountsBoard from "../components/AccountsBoard"
import TradersBoard from "../components/TradersBoard"
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import LoginButton from "../components/LoginButton"
import LoginForm from "../components/LoginForm"
import TradingPanel from "../components/TradingPanel"

type Props = {
    accounts: any[]
    traders: any[]
}

const HomePage = ({ accounts, traders }: Props) => {
    const session = useSession()
    const supabase = useSupabaseClient()

    return (
        <div>
            <Head>
                <title>TeaSquare - Dashboard</title>
            </Head>
            {!session ? (
                <LoginForm supabaseClient={supabase} />
            ) : (
                <div className='bg-main bg-cover backdrop-blur-lg h-full'>
                    <div className='flex flex-row items-center justify-center'>
                        <Link href='/'>
                            <h1 className="font-space font-semibold text-6xl text-white text-center my-12">TeaSquare Dashboard</h1>
                        </Link>
                        <LoginButton supabaseClient={supabase} session={session} />
                    </div>
                    <TradingPanel />
                    <div className='flex flex-col lg:flex-row lg:justify-between' >
                        <AccountsBoard accounts={accounts} />
                        <TradersBoard traders={traders} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, { cache: "no-store" })
    const accounts = await res.json()
    const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders`, { cache: "no-store" })
    const traders = await res2.json()

    return {
        props: {
            accounts,
            traders
        }
    }
}