"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import createPost from "@/actions/createPost"
import { useRouter } from "next/navigation"

export function CreatePost() {
    const router = useRouter()

    const [content, setContent] = useState("")

    const handlePost = async (e) => {
        e.preventDefault()

        const response = await createPost(content)
        if (response.ok) {
            router.refresh()
        }

    }

    return (
        <div className="grid gap-2 px-4">
            <Textarea onChange={(e) => setContent(e.target.value)} placeholder="Type your message here." />
            <Button onClick={handlePost}>Send message</Button>
        </div>
    )
}