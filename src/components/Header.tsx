import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Header() {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 transition-all">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent rounded-lg p-2 hover-glow transition-all" />
          
          <div className="hidden lg:flex items-center gap-3 bg-background/70 rounded-xl px-4 py-2 max-w-md hover-glow">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search links..." 
              className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" className="relative hover-glow">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-primary rounded-full text-xs flex items-center justify-center text-primary-foreground animate-glow">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hover-glow">
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}