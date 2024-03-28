export async function GET() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/account/login`, {
        cache: "no-store"
    })
    const data = await res.json()
    return Response.json({ data })
}