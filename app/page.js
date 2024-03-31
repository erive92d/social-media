
import Signup from "@/components/accountComps/Signup";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";



export default async function Home() {

  const session = await getServerSession(authOptions)

  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-lime-600 flex flex-col lg:flex-row items-center">
      <div className="flex-grow lg:min-h-screen flex flex-col justify-center items-center text-white">
        <span className="text-4xl font-bold max-w-80">
          MORE THAN AN AREA CODE. A LIFESTYLE
        </span>
      </div>
      <div className='lg:min-h-screen flex-grow flex flex-col justify-center items-center space-y-4'>
        <Signup />
      </div>
    </div>

  );
}
