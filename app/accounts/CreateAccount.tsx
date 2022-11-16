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
            const account = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, {
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
            <h2 className="text-2xl font-satoshi from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br bg-clip-text text-transparent">Ajouter un compte Bybit</h2>
            <form className="font-satoshi" onSubmit={onSubmit}>
                <label htmlFor="username" className="text-md font-satoshi text-white">Name</label>
                <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br p-1 w-full my-2">
                    <input name="username" className='rounded-full p-2 text-black w-full' onChange={(e) => setName(e.target.value)} />
                </div>
                <label htmlFor="api" className="text-md font-satoshi text-white">API Key</label>
                <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br p-1 w-full my-2">
                    <input name="api" className='rounded-full p-2 text-black w-full' onChange={(e) => setApiKey(e.target.value)} />
                </div>
                <label htmlFor="secret" className="text-md font-satoshi text-white">API Secret</label>
                <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br p-1 w-full my-2">
                    <input name="secret" className='rounded-full p-2 text-black w-full' onChange={(e) => setApiSecret(e.target.value)} />
                </div>
                <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br p-1 my-4 w-full">
                    <input className='rounded-full bg-white p-2 text-black w-full hover:text-white hover:bg-transparent transition cursor-pointer' type="submit" />
                </div>
            </form>
        </div>
    )
}

export default CreateAccount