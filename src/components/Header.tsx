import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Bell, User, Plus, Command } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-6">
          <SidebarTrigger className="text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg p-2 transition-all duration-200" />
          
          <div className="hidden md:flex items-center gap-3 bg-card rounded-xl px-4 py-2.5 w-96 border shadow-sm">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search your links..." 
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto placeholder:text-muted-foreground"
            />
            <div className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="hidden sm:flex items-center gap-2 text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Link to="/add">
              <Plus className="w-4 h-4" />
              <span className="hidden lg:inline">Add Link</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground hover:bg-accent hover:text-accent-foreground ml-2 rounded-full"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile search bar */}
      <div className="md:hidden px-6 pb-4">
        <div className="flex items-center gap-3 bg-card rounded-xl px-4 py-2.5 border shadow-sm">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search your links..." 
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </header>
  );
}