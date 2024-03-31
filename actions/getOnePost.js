export default async function getOnePost(id) {

    const posts = await fetch(`/api/post/${id}`, {
        cache: "no-store"
    })

    console.log(posts)
    if (!posts.ok) {
        throw new Error("Error getting posts")
    }

    return await posts.json()
}