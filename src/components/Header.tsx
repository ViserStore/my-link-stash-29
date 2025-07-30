import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell, User, Plus, Command } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Header() {
  const location = useLocation();

  return (
    <header className="h-20 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between h-full px-8">
        {/* Left side */}
        <div className="flex items-center gap-8">
          <SidebarTrigger className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-200 text-gray-700" />
          
          {/* Search bar */}
          <div className="hidden lg:flex items-center gap-4 bg-gray-50 rounded-2xl px-6 py-4 w-96 border-2 border-transparent hover:border-blue-200 focus-within:border-blue-300 transition-all duration-200">
            <Search className="w-5 h-5 text-gray-500" />
            <Input 
              placeholder="Search your amazing links..." 
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-gray-800 placeholder:text-gray-500 font-medium"
            />
            <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-xl border">
              <Command className="w-3 h-3" />
              <span className="font-semibold">K</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Add Link button */}
          <Button 
            asChild
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Link to="/add" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Link</span>
            </Link>
          </Button>
          
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative p-3 hover:bg-gray-100 rounded-2xl transition-all duration-200 text-gray-700"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></span>
          </Button>
          
          {/* Profile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-200 text-gray-700 ml-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </Button>
        </div>
      </div>
      
      {/* Mobile search */}
      <div className="lg:hidden px-8 pb-4">
        <div className="flex items-center gap-4 bg-gray-50 rounded-2xl px-6 py-4 border-2 border-transparent focus-within:border-blue-300 transition-all duration-200">
          <Search className="w-5 h-5 text-gray-500" />
          <Input 
            placeholder="Search your amazing links..." 
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-gray-800 placeholder:text-gray-500 font-medium"
          />
        </div>
      </div>
    </header>
  );
}