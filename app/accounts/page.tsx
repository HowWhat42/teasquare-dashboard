import Account from "./Account"
import CreateAccount from "./CreateAccount"

const getAccounts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, { cache: 'no-store' })
    const data = await res.json()
    return data as any[]
}

const AccountsPage = async () => {
    const accounts = await getAccounts()

    return (
        <div>
            <h1>Accounts</h1>
            <CreateAccount />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actif</th>
                        <th>Max Leverage</th>
                        <th>Bankroll position percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts?.map((account) => (
                        <Account key={account.id} account={account} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AccountsPage