import { redirect } from "next/navigation"

export default async function getOnePost(id) {

    const posts = await fetch(`/api/post/${id}`, {
        cache: "no-store"
    })

    if (!posts.ok) {
        window.location.href = "/dashboard"
        throw new Error("Error getting posts")
    }

    return await posts.json()
}