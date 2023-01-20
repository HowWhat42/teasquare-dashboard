import { useState } from 'react'
import { useRouter } from "next/navigation"
import Link from 'next/link'

type Props = {
    account: {
        id: number,
        name: string,
        active: boolean,
    }
}

const Account = ({ account }: Props) => {
    const router = useRouter();
    const { id, name, active } = account || {}

    const onChange = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}/active`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ active: !active }),
        })
        router.refresh()
    }

    const onDelete = async () => {
        if (window.confirm(`Êtes vous sûr de vouloir supprimer ${account.name} ?`)) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, { method: "DELETE" })
            router.refresh()
        }
    }

    return (
        <div>
            <div className='flex justify-between items-center text-sm lg:text-lg text-white font-satoshi'>
                <div className='max-w-6'><p className='text-md lg:text-xl'>{id}</p></div>
                <Link href={`accounts/${id}`} className='w-24'>
                    <p className='text-md lg:text-xl from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br bg-clip-text text-white hover:text-transparent transition cursor-pointer'>{name}</p>
                </Link>
                <div className='max-w-12 mx-6'>
                    <label htmlFor="active">Bot</label>
                    <input className='ml-2' name='active' type="checkbox" defaultChecked={active} onChange={onChange} />
                </div>
                <div>
                    <button className="m-2 p-1 rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br" onClick={onDelete}>
                        <span className="block text-black rounded-full px-2 py-1 lg:px-4 lg:py-2 bg-white hover:bg-transparent hover:text-white transition">Supprimer</span>
                    </button>
                </div>
            </div>
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
        </div>
    )
}

export default Account