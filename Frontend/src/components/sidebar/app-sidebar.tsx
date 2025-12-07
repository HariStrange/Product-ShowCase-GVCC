"use client";

import * as React from "react";
import { GalleryVerticalEnd, MessageSquare, Package } from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/authContext";

const data = {
  teams: [
    {
      name: "GVCC",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Products",
      url: "/products",
      icon: Package,
    },
    {
      title: "Enquiries",
      url: "/enquiries",
      icon: MessageSquare,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, role } = useAuth();

  const sidebarUser =
    role === "ADMIN" && user
      ? {
          name: "Hari",
          email: user.email,
          avatar: "https://github.com/shadcn.png", 
        }
      : {
          name: "Guest",
          email: "guest@mail.com",
          avatar: "", // Empty avatar triggers the 'G' fallback
        };

  // 2. Logic to Filter Navigation Items
  const filteredNavMain = data.navMain.filter((item) => {
    // If the item is "Enquiries", only show it if role is ADMIN
    if (item.title === "Enquiries") {
      return role === "ADMIN";
    }
    // Otherwise (like "Products"), always show it
    return true;
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* Pass the filtered list here */}
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}