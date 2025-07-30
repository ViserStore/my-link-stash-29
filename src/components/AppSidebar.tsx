import { useState } from "react";
import { 
  Home, 
  Eye, 
  Plus, 
  Bookmark, 
  Settings, 
  Star,
  ChevronDown,
  ChevronRight,
  Globe,
  Sparkles
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
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavCls = (path: string) => {
    const active = isActive(path);
    return `flex items-center w-full px-3 py-2.5 rounded-xl transition-all duration-200 ${
      active 
        ? "bg-primary text-primary-foreground shadow-md font-semibold" 
        : "text-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm"
    }`;
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-72"} transition-all duration-300 bg-background border-r border-border`}>
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
            <Globe className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1">
              <h1 className="text-xl font-bold text-foreground">Link Hub</h1>
              <p className="text-sm text-muted-foreground">Organize & Share</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 space-y-6">
        {/* Main Navigation */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink to={item.url} className={getNavCls(item.url)}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3 truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              <button
                onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                className="flex items-center gap-2 w-full hover:text-foreground transition-colors"
              >
                <span>Categories</span>
                {categoriesExpanded ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )}
              </button>
            </SidebarGroupLabel>
          )}
          {(collapsed || categoriesExpanded) && (
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {categoryItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="p-0">
                      <NavLink to={item.url} className={getNavCls(item.url)}>
                        <CategoryIcon category={item.categoryId as any} size="sm" className="flex-shrink-0" />
                        {!collapsed && (
                          <div className="flex-1 flex items-center justify-between ml-3 min-w-0">
                            <span className="truncate">{item.title}</span>
                            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium ml-2">
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
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-0">
              <NavLink to="/settings" className={getNavCls("/settings")}>
                <Settings className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {!collapsed && (
          <div className="mt-4 p-3 bg-accent/30 rounded-xl border border-accent/50">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Pro Tip</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Use Ctrl+K to quickly search your links
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}