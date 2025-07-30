import { useState } from "react";
import { 
  Home, 
  Eye, 
  Plus, 
  Star,
  Settings, 
  Globe,
  ChevronDown,
  ChevronRight,
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

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-80"} bg-white border-r border-gray-200 transition-all duration-300`}>
      {/* Header */}
      <SidebarHeader className="p-6 bg-gradient-to-r from-green-500 to-blue-500">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">Link Hub</h1>
              <p className="text-sm text-white/80">Organize & Share</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="p-6 bg-white">
        {/* Main Navigation */}
        <SidebarGroup className="mb-8">
          {!collapsed && (
            <SidebarGroupLabel className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-3">
              Main Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {mainItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all duration-200 ${
                          active 
                            ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transform scale-105" 
                            : "text-gray-700 hover:bg-gray-100 hover:transform hover:scale-105"
                        }`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && <span className="ml-4 font-semibold">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="px-3 mb-4">
              <button
                onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                className="flex items-center justify-between w-full text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
              >
                <span>Categories</span>
                {categoriesExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </SidebarGroupLabel>
          )}
          {(collapsed || categoriesExpanded) && (
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {categoryItems.map((item) => {
                  const active = isActive(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink 
                          to={item.url} 
                          className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all duration-200 ${
                            active 
                              ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transform scale-105" 
                              : "text-gray-700 hover:bg-gray-100 hover:transform hover:scale-105"
                          }`}
                        >
                          <CategoryIcon category={item.categoryId as any} size="sm" className="flex-shrink-0" />
                          {!collapsed && (
                            <div className="flex-1 flex items-center justify-between ml-4 min-w-0">
                              <span className="font-semibold truncate">{item.title}</span>
                              <span className={`text-xs px-2 py-1 rounded-full font-bold ml-3 ${
                                active 
                                  ? "bg-white/20 text-white" 
                                  : "bg-yellow-400 text-gray-800"
                              }`}>
                                {item.count}
                              </span>
                            </div>
                          )}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-6 bg-white border-t border-gray-200">
        <SidebarMenu className="mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink 
                to="/settings" 
                className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all duration-200 ${
                  isActive("/settings") 
                    ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg transform scale-105" 
                    : "text-gray-700 hover:bg-gray-100 hover:transform hover:scale-105"
                }`}
              >
                <Settings className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="ml-4 font-semibold">Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {!collapsed && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-gray-800" />
              <span className="text-sm font-bold text-gray-800">Pro Tip!</span>
            </div>
            <p className="text-xs text-gray-800 font-medium">
              Use Ctrl+K to quickly search through all your saved links
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}