import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
export default async function page() {

    return (
        <div className='min-h-screen bg-black text-white'>
            Dashboard
        </div>
    )
}
