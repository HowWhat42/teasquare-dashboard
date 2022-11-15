'use client'
import { useRouter } from "next/navigation"

type Props = {
    trader: {
        id: number
        name: string
        url: string
        telegram: boolean
        bybit: boolean
    }
}

const Trader = ({ trader }: Props) => {
    const router = useRouter();
    const { id, name, url, telegram, bybit } = trader || {}

    const setTelegram = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ telegram: !telegram }),
        })
        router.refresh()
    }

    const setBybit = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bybit: !bybit }),
        })
        router.refresh()
    }

    const onDelete = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, { method: "DELETE" })
        router.refresh()
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td><a href={url} target='_blank'>{url}</a></td>
            <td><input type='checkbox' defaultChecked={telegram} onChange={setTelegram} /></td>
            <td><input type='checkbox' defaultChecked={bybit} onChange={setBybit} /></td>
            <td><button onClick={onDelete}>delete</button></td>
        </tr>
    )
}

export default Trader