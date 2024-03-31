"use client"

import getOnePost from "@/actions/getOnePost"
import { useEffect, useState } from "react"

export default function page({ params }) {
    const { id } = params
    const [post, setPost] = useState(null)

    useEffect(() => {
        const getPost = async () => {
            const data = await getOnePost(id)
            setPost(data)
        }
        if (id) {
            getPost()
        }
    }, [id])


    return (
        <div>
            {!post ? <h1>Loading..</h1> :
                <div>
                    {post.content}
                </div>
            }
        </div>
    )
}
