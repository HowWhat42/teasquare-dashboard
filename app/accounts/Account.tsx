'use client'
import { useState } from 'react'
import { useRouter } from "next/navigation"

type Props = {
    account: {
        id: number,
        name: string,
        active: boolean,
        maxLeverage: number,
        bankrollPercentage: number,
    }
}

const Account = ({ account }: Props) => {
    const router = useRouter();
    const { id, name, active, maxLeverage, bankrollPercentage } = account || {}
    const [leverage, setLeverage] = useState(maxLeverage)
    const [bankroll, setBankroll] = useState(bankrollPercentage)

    const onChange = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}/active`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ active: !active }),
        })
        router.refresh()
    }

    const onSubmit = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ maxLeverage: leverage, bankrollPercentage: bankroll }),
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
            <td><input type="checkbox" defaultChecked={active} onChange={onChange} /></td>
            <td><input type="number" value={leverage} onChange={(e) => setLeverage(Number(e.target.value))} /></td>
            <td><input type="number" value={bankroll} onChange={(e) => setBankroll(Number(e.target.value))} /></td>
            <td><button onClick={onSubmit}>submit</button></td>
            <td><button onClick={onDelete}>delete</button></td>
        </tr>
    )
}

export default Account