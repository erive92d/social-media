"use client"

import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { useState } from "react"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"


export default function Login() {
    const session = useSession()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const handleClick = async (e) => {
        e.preventDefault()

        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        if (!response?.ok) {
            console.log(response)
            setError("Error")
        }

        if (response?.status === 200) {
            router.push("/dashboard")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-t from-black to-lime-600 flex flex-col justify-center items-center">
            <div className='space-y-4'>
                <h1 className='text-white'>Login</h1>
                <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" />
                <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                <Button onClick={handleClick}  >Login</Button>
            </div>
        </div>
    )
}
