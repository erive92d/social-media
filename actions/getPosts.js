import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"


export default async function getPosts() {

    const posts = await fetch(`${process.env.NEXTAUTH_URL}/api/post`, {
        cache: "no-store"
    })
    if (!posts.ok) {
        throw new Error("Error getting posts")
    }

    return await posts.json()
}