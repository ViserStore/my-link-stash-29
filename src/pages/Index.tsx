import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddLinkInput from "@/components/AddLinkInput";
import CategorySection from "@/components/CategorySection";
import { BarChart3, TrendingUp, Users, Globe, Star, Eye } from "lucide-react";

interface Link {
  id: string;
  title: string;
  url: string;
  domain: string;
}

interface Category {
  id: string;
  title: string;
  emoji: string;
  links: Link[];
}

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("food");
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "food",
      title: "Food",
      emoji: "🌯",
      links: [
        { id: "1", title: "Joe's Pizza", url: "https://joespizzanyc.com", domain: "joespizzanyc.com" },
        { id: "2", title: "McDonald's", url: "https://mcdonalds.com", domain: "mcdonalds.com" },
        { id: "15", title: "Starbucks", url: "https://starbucks.com", domain: "starbucks.com" },
      ],
    },
    {
      id: "bands",
      title: "Bands",
      emoji: "🎸",
      links: [
        { id: "3", title: "Metallica", url: "https://metallica.com", domain: "metallica.com" },
        { id: "4", title: "Coldplay", url: "https://coldplay.com", domain: "coldplay.com" },
        { id: "16", title: "The Beatles", url: "https://thebeatles.com", domain: "thebeatles.com" },
      ],
    },
    {
      id: "shops",
      title: "Shops",
      emoji: "🛍️",
      links: [
        { id: "5", title: "Amazon", url: "https://amazon.com", domain: "amazon.com" },
        { id: "6", title: "Zara", url: "https://zara.com", domain: "zara.com" },
        { id: "17", title: "Nike", url: "https://nike.com", domain: "nike.com" },
      ],
    },
    {
      id: "games",
      title: "Games",
      emoji: "🎮",
      links: [
        { id: "7", title: "Steam", url: "https://steampowered.com", domain: "steampowered.com" },
        { id: "8", title: "Epic Games", url: "https://epicgames.com", domain: "epicgames.com" },
        { id: "18", title: "Nintendo", url: "https://nintendo.com", domain: "nintendo.com" },
      ],
    },
  ]);

  const extractDomain = (url: string): string => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const addLink = (url: string) => {
    const domain = extractDomain(url);
    if (!domain) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    const title = domain.charAt(0).toUpperCase() + domain.slice(1).split('.')[0];
    const newLink: Link = {
      id: Date.now().toString(),
      title,
      url,
      domain,
    };

    setCategories(prev => 
      prev.map(category => 
        category.id === selectedCategory
          ? { ...category, links: [...category.links, newLink] }
          : category
      )
    );

    setSelectedLink(newLink.id);
    
    toast({
      title: "Link added!",
      description: `Added ${title} to ${categories.find(c => c.id === selectedCategory)?.title}`,
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedLink(null);
  };

  const handleLinkSelect = (linkId: string, categoryId: string) => {
    setSelectedLink(linkId);
    setSelectedCategory(categoryId);
  };

  const totalLinks = categories.reduce((sum, cat) => sum + cat.links.length, 0);

  return (
    <div className="bg-background font-baloo min-h-screen">
      <div className="container-responsive py-4 sm:py-6 lg:py-8">
        {/* Hero Section */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="responsive-title font-bold gradient-hero bg-clip-text text-transparent mb-4 animate-fade-in">
            🌐 Link Dashboard
          </h1>
          <p className="text-muted-foreground responsive-text max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Organize, manage, and share your favorite links with style in your personal command center
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6 card-glow hover-lift animate-fade-in group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Links</p>
                <p className="text-xl sm:text-2xl font-bold glow-text">{totalLinks}</p>
              </div>
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:animate-glow" />
            </div>
          </Card>

          <Card className="p-4 sm:p-6 card-glow hover-lift animate-fade-in group" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Categories</p>
                <p className="text-xl sm:text-2xl font-bold glow-text-accent">{categories.length}</p>
              </div>
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-accent group-hover:animate-glow" />
            </div>
          </Card>

          <Card className="p-4 sm:p-6 card-glow hover-lift animate-fade-in group" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Most Popular</p>
                <p className="text-xl sm:text-2xl font-bold glow-text">Food</p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:animate-glow" />
            </div>
          </Card>

          <Card className="p-4 sm:p-6 card-glow hover-lift animate-fade-in group" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Favorites</p>
                <p className="text-xl sm:text-2xl font-bold glow-text-accent">12</p>
              </div>
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-accent group-hover:animate-glow" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-2">
            <Card className="p-4 sm:p-6 card-glow animate-scale-in">
              <h2 className="responsive-heading font-semibold mb-4 sm:mb-6 flex items-center gap-3">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                Link Management
              </h2>
              
              <AddLinkInput onAddLink={addLink} />

              <div className="space-y-4 sm:space-y-6">
                {categories.map((category) => (
                  <CategorySection
                    key={category.id}
                    title={category.title}
                    emoji={category.emoji}
                    categoryId={category.id}
                    links={category.links}
                    selectedCategory={selectedCategory}
                    selectedLink={selectedLink}
                    onCategorySelect={handleCategorySelect}
                    onLinkSelect={handleLinkSelect}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 card-glow animate-scale-in">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 glow-text-accent">
                <Users className="w-5 h-5 text-accent" />
                Quick Actions
              </h3>
              
              <div className="space-y-2 sm:space-y-3">
                <Button variant="neon" size="sm" className="w-full justify-start text-sm">
                  📊 View Analytics
                </Button>
                <Button variant="neon" size="sm" className="w-full justify-start text-sm">
                  📤 Export Links
                </Button>
                <Button variant="neon" size="sm" className="w-full justify-start text-sm">
                  🔗 Share Collection
                </Button>
                <Button variant="neon" size="sm" className="w-full justify-start text-sm">
                  ⚙️ Manage Categories
                </Button>
              </div>
            </Card>

            <Card className="p-4 sm:p-6 card-glow animate-scale-in">
              <h3 className="text-lg font-semibold mb-4 glow-text">💡 Pro Tips</h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                <p>• Use Ctrl+K to quick search</p>
                <p>• Drag & drop to reorder links</p>
                <p>• Add custom tags for organization</p>
                <p>• Share with preview mode</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
