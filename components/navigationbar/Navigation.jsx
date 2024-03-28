"use client"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useRouter } from "next/navigation"

export default function Navigation() {

    const router = useRouter()
    const pathname = usePathname()
    const isLandingPage = pathname === "/"
    const isAccountPage = pathname === "/account/login" || pathname === "/account/signup"
    const hideNav = isLandingPage || isAccountPage
    const { data } = useSession()

    return (
        <>
            {!hideNav &&
                <div className="flex bg-lime-600 items-center justify-between px-6 py-8">
                    <span>Logo</span>
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Hello {data?.user?.username}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink>
                                        <button onClick={() => signOut({ redirect: false }).then(() => { router.push("/") })}  >Sign out</button>
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Reserve</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink>Link</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            }
        </>


    )
}
