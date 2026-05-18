import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu"


export function Navbar() {
    return (
        <div className="w-screen h-10 to-blue-400 flex flex-row  ">
            <NavigationMenu className="flex flex-row gap-4 items-center">
                <NavigationMenuList className="flex flex-row gap-2">
                    <div className="w-screen h-10 bg-purple-200 flex items-center justify-between px-4">
                        <div className="font-bold">Inventora</div>

                        <div className="flex gap-4">
                            <NavigationMenuLink href="/sign-in">Login</NavigationMenuLink>
                            <NavigationMenuLink href="/sign-up">SignUp</NavigationMenuLink>
                        </div>
                    </div>

                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
