"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "../../../../public/logo.svg";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  PieChart,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const navItems = [
  { path: "/", icon: LayoutDashboard },
  { path: "/messages", icon: Mail },
  { path: "/users", icon: Users },
  { path: "/chat", icon: MessageSquare },
  { path: "/analytics", icon: PieChart },
  { path: "/settings", icon: Settings },
];
function NavigationSidebar() {
  const router = usePathname();
  return (
    <nav className="flex flex-col h-full w-full  py-4 space-y-4  items-center shadow-xl">
      <div>
        <Image
          src={logo}
          alt="Logo"
          quality={100}
          className="h-12 w-12 object-cover rotate-180"
        />
      </div>

      <div className="flex-1 flex flex-col items-center gap-4   ">
        {navItems.map((item) => (
          <div key={item.path}>
            <Button
              // variant="ghost"
              size="icon"
              className={`w-8 h-8 relative z-10 rounded-full ${
                router === item.path ? "bg-black" : "!bg-transparent"
              }`}
            >
              <item.icon
                strokeWidth={2.5}
                absoluteStrokeWidth
                className={`h-7 w-7 font-bold  ${
                  router === item.path ? "text-white" : "text-black"
                }`}
              />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-y-4 items-center pb-3 mt-auto">
        <Link href="/profile">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png " />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        <LogOut
          strokeWidth={2.5}
          absoluteStrokeWidth
          className="h-5 w-5 font-bold"
        />
      </div>
    </nav>
  );
}

export default NavigationSidebar;
