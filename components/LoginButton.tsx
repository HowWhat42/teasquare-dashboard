import { SupabaseClient, Session } from '@supabase/auth-helpers-react'

type Props = {
    supabaseClient: SupabaseClient<any, "public", any>
    session: Session | null
}

const LoginButton = ({ session, supabaseClient }: Props) => {
    if (session) {
        return (
            <div className="absolute left-10 text-xl text-white">
                Connecté en tant que {session?.user?.email} <br />
                <button className="from-green-400 via-blue-500 to-purple-500 bg-gradient-to-br bg-clip-text text-white hover:text-transparent" onClick={() => supabaseClient.auth.signOut()}>Déconnexion</button>
            </div>
        )
    }
    return null
}

export default LoginButton