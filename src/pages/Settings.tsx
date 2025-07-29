import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, User, Bell, Shield, Palette, Database } from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(false);
  const [theme, setTheme] = useState("blue");

  return (
    <div className="container-responsive py-4 sm:py-6 lg:py-8">
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h1 className="responsive-title font-bold glow-text flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 mb-3 animate-fade-in">
          <SettingsIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          Settings
        </h1>
        <p className="text-muted-foreground responsive-text max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Customize your Link Hub experience to match your preferences
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {/* Profile Settings */}
        <Card className="p-4 sm:p-6 animate-scale-in card-glow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 glow-text">
            <User className="w-5 h-5 text-primary" />
            Profile Settings
          </h2>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" defaultValue="link_master" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" defaultValue="user@example.com" />
            </div>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-4 sm:p-6 animate-scale-in card-glow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 glow-text-accent">
            <Palette className="w-5 h-5 text-accent" />
            Appearance
          </h2>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="theme">Theme Color</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">💙 Ocean Blue</SelectItem>
                  <SelectItem value="purple">💜 Royal Purple</SelectItem>
                  <SelectItem value="green">💚 Forest Green</SelectItem>
                  <SelectItem value="orange">🧡 Sunset Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-4 sm:p-6 animate-scale-in card-glow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 glow-text">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified about new features</p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-sync" className="text-base">Auto Sync</Label>
                <p className="text-sm text-muted-foreground">Automatically sync across devices</p>
              </div>
              <Switch
                id="auto-sync"
                checked={autoSync}
                onCheckedChange={setAutoSync}
              />
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-4 sm:p-6 animate-scale-in card-glow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 glow-text-accent">
            <Database className="w-5 h-5 text-accent" />
            Data Management
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                Export Data
              </Button>
              <Button variant="outline" className="flex-1">
                Import Data
              </Button>
            </div>
            
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Danger Zone
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                This action cannot be undone. This will permanently delete your account and all data.
              </p>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button variant="outline" className="w-full sm:w-auto px-6">
            Reset to Defaults
          </Button>
          <Button variant="gradient" className="w-full sm:w-auto font-semibold px-8">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}