import CreateAccount from "../components/CreateAccount"
import Account from "../components/Account"

type Props = {
    accounts: any[]
}

const AccountsBoard = ({ accounts }: Props) => {
    return (
        <div className="bg-gray-700 rounded-2xl mx-16 p-6">
            <h3 className="text-4xl font-space text-white">Liste des comptes Bybit</h3>
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
            <CreateAccount />
            <div className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-r h-0.5 my-2" />
            <div className="flex flex-col">
                {accounts?.map((account) => (
                    <Account key={account.id} account={account} />
                ))}
            </div>
        </div>
    )
}

export default AccountsBoard