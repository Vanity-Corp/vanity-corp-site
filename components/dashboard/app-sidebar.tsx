import {
  Wallet,
  Newspaper,
  PanelTop,
  Images,
  Settings,
  LucideLayoutDashboard,
  CircleUserRound,
  Users,
  Mail,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavUser } from "./nav-user";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
const data = {
  user: {
    name: "MohMost",
    email: "mohmost32@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
};
const items = [
  {
    title: "DASHBOARD",
    url: "/dashboard",
    icon: LucideLayoutDashboard,
  },
  {
    title: "VANITEAM",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "ARTICLES",
    url: "/dashboard/posts",
    icon: Newspaper,
  },
  {
    title: "PAGES",
    url: "/dashboard/pages",
    icon: PanelTop,
  },
  {
    title: "MEDIA",
    url: "/dashboard/media",
    icon: Images,
  },
  {
    title: "DEVIS",
    url: "/dhasboard/quote",
    icon: Wallet,
  },
  {
    title: "EMAILS",
    url: "/dashboard/contacts",
    icon: Mail,
  },
];
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-0">
        <Image
          className="w-2/3 my-4 px-2"
          src="/vanity_corp_logo.svg"
          alt="logo"
          width={100}
          height={100}
        />{" "}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon size={64} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
