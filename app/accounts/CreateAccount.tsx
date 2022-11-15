'use client'
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const CreateAccount = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [apiSecret, setApiSecret] = useState("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const newAccount = {
                name,
                apiKey,
                apiSecret,
            }
            const account = await fetch("http://localhost:3001/api/accounts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAccount),
            });
            if (account.status === 200) {
                setName("");
                setApiKey("");
                setApiSecret("");
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
                <input onChange={(e) => setApiKey(e.target.value)} />
                <input onChange={(e) => setApiSecret(e.target.value)} />
                <input type="submit" />
            </form>
        </div>
    )
}

export default CreateAccount