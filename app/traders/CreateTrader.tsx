'use client'
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const CreateTrader = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("")

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const newTrader = {
                name,
                url,
            }
            const trader = await fetch("http://localhost:3001/api/traders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTrader),
            });
            if (trader.status === 200) {
                setName("");
                setUrl("");
            }
            router.refresh()
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h2>Form</h2>
            <form onSubmit={onSubmit}>
                <input onChange={(e) => setName(e.target.value)} />
                <input onChange={(e) => setUrl(e.target.value)} />
                <input type="submit" />
            </form>
        </div>
    )
}

export default CreateTrader