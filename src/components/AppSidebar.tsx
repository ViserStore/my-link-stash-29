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
      ? "bg-primary text-primary-foreground font-semibold shadow-lg" 
      : "hover:bg-accent hover:text-accent-foreground transition-smooth";
  };

  return (
    <Sidebar className={`${collapsed ? "w-14 sm:w-16" : "w-64 sm:w-72"} transition-all duration-300 bg-card border-r`}>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Globe className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-primary">Link Hub</h2>
              <p className="text-xs text-muted-foreground">Organize & Share</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-semibold mb-3 text-sm">
            {!collapsed && "Main Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-xl h-11">
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span className="ml-3 font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-muted-foreground font-semibold mb-3 text-sm">
            {!collapsed && "Categories"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {categoryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-xl h-11">
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <CategoryIcon category={item.categoryId as any} size="sm" />
                      {!collapsed && (
                        <div className="flex-1 flex items-center justify-between ml-3">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full font-medium">
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

      <SidebarFooter className="border-t border-border p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="rounded-xl h-11">
              <NavLink to="/settings" className={getNavCls("/settings")}>
                <Settings className="w-5 h-5" />
                {!collapsed && <span className="ml-3 font-medium">Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}