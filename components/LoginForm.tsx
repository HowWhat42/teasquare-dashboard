import { useState } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { SupabaseClient } from '@supabase/auth-helpers-react'

type Props = {
    supabaseClient: SupabaseClient<any, "public", any>
}

const LoginForm = ({ supabaseClient }: Props) => {
    const [error, setError] = useState('')
    const router = useRouter()
    const onSubmit = async (values: any, { setSubmitting }: any) => {
        setSubmitting(true)
        try {
            await supabaseClient.auth.signInWithPassword(values)
            router.push('/')
            setSubmitting(false)
            setError('')
        } catch (err: any) {
            setError(err.message)
            setSubmitting(false)
        }
    }

    return (
        <div className='bg-main bg-cover backdrop-blur-lg h-screen'>
            <div className='flex flex-row items-center justify-center'>
                <Link href='/'>
                    <h1 className="font-space font-semibold text-6xl text-white text-center my-12">TeaSquare Dashboard</h1>
                </Link>
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Email non valide')
                        .required('Email requis'),
                    password: Yup.string().required('Mot de passe requis'),
                })}
                onSubmit={onSubmit}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col items-center justify-center py-2">
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <div className="text-red-400 text-md text-center rounded p-2">
                                    {error}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        Email
                                        <Field
                                            name="email"
                                            aria-label="entrez votre email"
                                            aria-required="true"
                                            type="text"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="email" />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="password"
                                        className="uppercase text-sm text-gray-600 font-bold"
                                    >
                                        mot de passe
                                        <Field
                                            name="password"
                                            aria-label="entrez votre mot de passe"
                                            aria-required="true"
                                            type="password"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className="bg-green-400 text-gray-100 p-3 rounded-lg w-full"
                                    >
                                        {formik.isSubmitting ? 'Patienter...' : 'Connexion'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default LoginForm