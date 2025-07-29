import { useState } from "react";
import { 
  Home, 
  Eye, 
  Plus, 
  Bookmark, 
  Settings, 
  Star,
  TrendingUp,
  Users,
  Globe
} from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Preview Links", url: "/preview", icon: Eye },
  { title: "Add Links", url: "/add", icon: Plus },
  { title: "Favorites", url: "/favorites", icon: Star },
];

const categoryItems = [
  { title: "Food & Dining", url: "/category/food", categoryId: "food", count: 12 },
  { title: "Entertainment", url: "/category/entertainment", categoryId: "entertainment", count: 8 },
  { title: "Shopping", url: "/category/shopping", categoryId: "shopping", count: 15 },
  { title: "Social", url: "/category/social", categoryId: "social", count: 6 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) => {
    const active = isActive(path);
    return active 
      ? "bg-sidebar-accent text-primary font-semibold glow-border" 
      : "hover:bg-sidebar-accent/50 transition-smooth";
  };

  return (
    <Sidebar className={`${collapsed ? "w-14 sm:w-16" : "w-64 sm:w-72"} transition-all duration-300`}>
      <SidebarHeader className="border-b border-sidebar-border p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg gradient-primary flex items-center justify-center animate-glow">
            <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-base sm:text-lg glow-text">Link Hub</h2>
              <p className="text-xs text-sidebar-foreground/70">Organize & Share</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-1 sm:p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold mb-2 text-xs sm:text-sm">
            {!collapsed && "Main Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-lg hover-glow">
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      {!collapsed && <span className="ml-2 sm:ml-3 text-sm sm:text-base">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4 sm:mt-6">
          <SidebarGroupLabel className="text-sidebar-foreground/70 font-semibold mb-2 text-xs sm:text-sm">
            {!collapsed && "Categories"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {categoryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-lg hover-glow">
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <CategoryIcon category={item.categoryId as any} size="sm" />
                      {!collapsed && (
                        <div className="flex-1 flex items-center justify-between ml-2 sm:ml-3">
                          <span className="text-sm sm:text-base">{item.title}</span>
                          <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                            {item.count}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3 sm:p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="rounded-lg hover-glow">
              <NavLink to="/settings" className={getNavCls("/settings")}>
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                {!collapsed && <span className="ml-2 sm:ml-3 text-sm sm:text-base">Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}