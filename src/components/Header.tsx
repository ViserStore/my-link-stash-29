import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Header() {
  const location = useLocation();

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg p-2 transition-colors" />
          
          <div className="hidden lg:flex items-center gap-3 bg-card rounded-xl px-4 py-2 max-w-md border">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search links..." 
              className="border-0 bg-transparent focus-visible:ring-0 p-0 h-auto"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground font-bold">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}