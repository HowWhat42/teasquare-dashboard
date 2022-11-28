import { useState } from 'react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LoginButton from "../components/LoginButton"
import Link from "next/link"
import { useSupabaseClient } from '@supabase/auth-helpers-react'

type Props = {}

const page = (props: Props) => {
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = useSupabaseClient()
    const onSubmit = async (values: any, { setSubmitting }: any) => {
        setSubmitting(true)
        try {
            await supabase.auth.signInWithPassword(values)
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
                <LoginButton />
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .max(30, 'Must be 30 characters or less')
                        .email('Invalid email address')
                        .required('Please enter your email'),
                    password: Yup.string().required('Please enter your password'),
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

export default page