import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { CreatePost } from "@/components/DashboardComps/postcomps/CreatePost"
export default async function page() {

    return (
        <div className='min-h-screen bg-white text-black px-2 py-4'>
            <CreatePost />
        </div>
    )
}
