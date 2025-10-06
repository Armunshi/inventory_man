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
        <>


            <div className="w-screen h-10 flex flex-row items-center border justify-between px-4">
                <div className="font-bold">Inventora</div>
                <NavigationMenu className="flex flex-row gap-4 items-center">
                    <NavigationMenuList className="flex flex-row gap-2">
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/sign-in">Login</NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/sign-up">SignUp</NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

        </>
    )
}
