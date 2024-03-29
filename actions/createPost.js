export default async function createPost(content) {

    const response = await fetch(`/api/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content })
    })

    if (!response.ok) {
        console.log("Error")
        return
    }

    return response
}