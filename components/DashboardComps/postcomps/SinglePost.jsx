"use client"
import { useSession } from "next-auth/react"
import { formatDate } from "@/utils/formatData"
import { Button } from "@/components/ui/button"
import DeletePost from "@/components/actions/DeletePost"
import UpdatePost from "@/components/actions/UpdatePost"
export default function SinglePost({ post }) {

    const session = useSession()

    const isPostAuthor = session?.data?.user?.id === post.authorId
    return (
        <div className=" px-2 py-4">
            <div className="relative border px-2 py-4 rounded">
                <span className="font-bold">{post.user.username}</span>
                <p className="py-2">
                    {post.content}
                </p>
                <p className='text-sm font-thin text-right'>{formatDate(post.createdAt)}</p>
                {isPostAuthor ?
                    <div className="flex gap-2">
                        <DeletePost postId={post.id} />
                        <UpdatePost />
                    </div>
                    :
                    null
                }

            </div>
        </div>
    )
}
