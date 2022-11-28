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
            const trader = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traders`, {
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
            <h2 className="text-2xl font-satoshi from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br bg-clip-text text-transparent">Ajouter un trader Binance</h2>
            <form className="font-satoshi" onSubmit={onSubmit}>
                <label htmlFor="name" className="text-md font-satoshi text-white">Nom</label>
                <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br p-1 w-full my-2">
                    <input name="name" className='rounded-full p-2 text-black w-full' onChange={(e) => setName(e.target.value)} />
                </div>
                <label htmlFor="url" className="text-md font-satoshi text-white">URL</label>
                <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br p-1 w-full my-2">
                    <input name="url" className='rounded-full p-2 text-black w-full' onChange={(e) => setUrl(e.target.value)} />
                </div>
                <div className="rounded-full from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br my-4 p-1 w-full">
                    <input className='rounded-full bg-white p-2 text-black w-full hover:text-white hover:bg-transparent transition cursor-pointer' type="submit" />
                </div>
            </form>
        </div>
    )
}

export default CreateTrader