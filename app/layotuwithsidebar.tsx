"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";

import { 
  Menu, 
  Search, 
  Bell, 
  Mail, 
  TrendingUp, 
  TrendingDown,
  ShoppingCart,
  Package,
  BarChart3,
  Users,
  Store
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LayoutWithSidebarProps {
  children: ReactNode;
}

export default function LayoutWithSidebar({ children }: LayoutWithSidebarProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
  
  if (!session) return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Not logged in</p>
    </div>
  );

  const navItems = [
    { href: "/", icon: BarChart3, label: "Dashboard" },
    { href: "/products", icon: Package, label: "Products" },
    { href: "/inventory", icon: Store, label: "Inventory" },
    { href: "/stock-levels", icon: TrendingUp, label: "Stock Levels" },
    { href: "/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/reports", icon: BarChart3, label: "Reports" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">I</span>
            </div>
            <span className="font-semibold text-lg">Inventora</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={() => signOut()} 
            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Menu */}
<Sheet>
  <SheetTrigger asChild className="lg:hidden fixed top-4 left-4 z-50">
    <Button variant="outline" size="icon">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-64 p-0">
    <div className="p-6 border-b">
      <SheetTitle className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">I</span>
        </div>
        <span className="font-semibold text-lg">Inventora</span>
      </SheetTitle>
    </div>
    
    <nav className="p-4">
      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  </SheetContent>
</Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md ml-0 lg:ml-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        {children}
      </div>
    </div>
  );
}