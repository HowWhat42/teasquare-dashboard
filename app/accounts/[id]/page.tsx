import React from 'react'
import Account from '../Account'

const getAccount = async (accountId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}`, { next: { revalidate: 10 } })
    const data = await res.json()
    return data
}

const page = async ({ params }: any) => {
    const account = await getAccount(params.id)

    return (
        <div className="bg-gray-700 rounded-2xl mx-16 p-6">
            <h2 className='text-white font-satoshi text-3xl'>Détails du compte</h2>
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
            <Account account={account} />
        </div>
    )
}

export default page