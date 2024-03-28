"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Signup() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`/api/account/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password })
        })

        if (!response.ok) {
            const res = await response.json()
            setError(res.message)
            return
        } else {
            router.push("/account/login")
        }
        // const result = await response.json()
        // console.log(result)

    }

    return (
        <>
            <h1 className="text-2xl font-bold text-white">Join us</h1>
            <div className="space-y-2 ">
                <Input onChange={(e) => setUsername(e.target.value)} value={username} type="text" placeholder="Username" />
                <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" />
                <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
                <div>
                    <Button onClick={handleSubmit} >Submit</Button>
                    <span className="px-2 text-white">
                        have an account?
                        click <Link className="underline" href="/account/login">here</Link>
                    </span>
                </div>
                {error && <span className="text-red-600 font-bold">{error}</span>}
            </div>
        </>
    )
}
