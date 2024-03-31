"use client"
import deletePost from "@/actions/deletePost"
import { Button } from "../ui/button"

export default function DeletePost({ postId }) {

    const handleClick = async (e) => {
        e.preventDefault()
        await deletePost(postId)
    }

    return (
        <Button onClick={handleClick} className="p-0 font-thin" variant={"link"}>
            delete
        </Button>
    )
}
