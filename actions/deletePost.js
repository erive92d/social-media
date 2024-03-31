import React from 'react'

export default async function deletePost(postId) {
    const response = await fetch(`/api/post/${postId}`, {
        method: "DELETE"
    })

    if (!response.ok) {
        throw new Error("Something went wrong")
    }

    window.location.href = "/dashboard"
}
