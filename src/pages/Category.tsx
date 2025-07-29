import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, ExternalLink, Heart, TrendingUp, Clock, Share2, Download } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";

interface Link {
  id: string;
  title: string;
  url: string;
  domain: string;
  visits?: number;
  lastVisited?: string;
  isFavorite?: boolean;
}

interface CategoryData {
  title: string;
  emoji: string;
  description: string;
  color: string;
  links: Link[];
}

const categoryData: Record<string, CategoryData> = {
  food: {
    title: "Food & Dining",
    emoji: "🍕",
    description: "Discover the best restaurants, recipes, and food delivery services",
    color: "from-orange-500 to-red-500",
    links: [
      {
        id: "1",
        title: "Joe's Pizza",
        url: "https://joespizzanyc.com",
        domain: "joespizzanyc.com",
        visits: 45,
        lastVisited: "2 hours ago",
        isFavorite: true
      },
      {
        id: "2",
        title: "Bon Appétit",
        url: "https://bonappetit.com",
        domain: "bonappetit.com",
        visits: 78,
        lastVisited: "5 hours ago",
        isFavorite: false
      },
      {
        id: "3",
        title: "DoorDash",
        url: "https://doordash.com",
        domain: "doordash.com",
        visits: 123,
        lastVisited: "1 day ago",
        isFavorite: true
      },
      {
        id: "4",
        title: "AllRecipes",
        url: "https://allrecipes.com",
        domain: "allrecipes.com",
        visits: 67,
        lastVisited: "3 days ago",
        isFavorite: false
      },
      {
        id: "5",
        title: "Starbucks",
        url: "https://starbucks.com",
        domain: "starbucks.com",
        visits: 89,
        lastVisited: "1 hour ago",
        isFavorite: true
      }
    ]
  },
  entertainment: {
    title: "Entertainment",
    emoji: "🎬",
    description: "Movies, music, games, and entertainment content",
    color: "from-purple-500 to-pink-500",
    links: [
      {
        id: "6",
        title: "Netflix",
        url: "https://netflix.com",
        domain: "netflix.com",
        visits: 234,
        lastVisited: "30 min ago",
        isFavorite: true
      },
      {
        id: "7",
        title: "Spotify",
        url: "https://spotify.com",
        domain: "spotify.com",
        visits: 189,
        lastVisited: "2 hours ago",
        isFavorite: true
      },
      {
        id: "8",
        title: "IMDb",
        url: "https://imdb.com",
        domain: "imdb.com",
        visits: 98,
        lastVisited: "1 day ago",
        isFavorite: false
      },
      {
        id: "9",
        title: "Twitch",
        url: "https://twitch.tv",
        domain: "twitch.tv",
        visits: 156,
        lastVisited: "4 hours ago",
        isFavorite: false
      },
      {
        id: "10",
        title: "Disney+",
        url: "https://disneyplus.com",
        domain: "disneyplus.com",
        visits: 87,
        lastVisited: "2 days ago",
        isFavorite: true
      }
    ]
  },
  shopping: {
    title: "Shopping",
    emoji: "🛍️",
    description: "Online stores, deals, and shopping platforms",
    color: "from-green-500 to-blue-500",
    links: [
      {
        id: "11",
        title: "Amazon",
        url: "https://amazon.com",
        domain: "amazon.com",
        visits: 312,
        lastVisited: "1 hour ago",
        isFavorite: true
      },
      {
        id: "12",
        title: "Etsy",
        url: "https://etsy.com",
        domain: "etsy.com",
        visits: 87,
        lastVisited: "6 hours ago",
        isFavorite: false
      },
      {
        id: "13",
        title: "Nike",
        url: "https://nike.com",
        domain: "nike.com",
        visits: 143,
        lastVisited: "1 day ago",
        isFavorite: true
      },
      {
        id: "14",
        title: "Best Buy",
        url: "https://bestbuy.com",
        domain: "bestbuy.com",
        visits: 76,
        lastVisited: "3 days ago",
        isFavorite: false
      },
      {
        id: "15",
        title: "eBay",
        url: "https://ebay.com",
        domain: "ebay.com",
        visits: 54,
        lastVisited: "5 days ago",
        isFavorite: false
      }
    ]
  },
  social: {
    title: "Social",
    emoji: "👥",
    description: "Social media platforms and communication tools",
    color: "from-blue-500 to-cyan-500",
    links: [
      {
        id: "16",
        title: "Twitter",
        url: "https://twitter.com",
        domain: "twitter.com",
        visits: 267,
        lastVisited: "15 min ago",
        isFavorite: true
      },
      {
        id: "17",
        title: "LinkedIn",
        url: "https://linkedin.com",
        domain: "linkedin.com",
        visits: 134,
        lastVisited: "3 hours ago",
        isFavorite: false
      },
      {
        id: "18",
        title: "Discord",
        url: "https://discord.com",
        domain: "discord.com",
        visits: 198,
        lastVisited: "1 hour ago",
        isFavorite: true
      },
      {
        id: "19",
        title: "Reddit",
        url: "https://reddit.com",
        domain: "reddit.com",
        visits: 223,
        lastVisited: "2 hours ago",
        isFavorite: true
      },
      {
        id: "20",
        title: "Instagram",
        url: "https://instagram.com",
        domain: "instagram.com",
        visits: 145,
        lastVisited: "4 hours ago",
        isFavorite: false
      }
    ]
  }
};

export default function Category() {
  const { category } = useParams<{ category: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const categoryInfo = category ? categoryData[category] : null;

  if (!categoryInfo) {
    return (
      <div className="bg-background font-baloo min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const filteredLinks = categoryInfo.links
    .filter(link => 
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.domain.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.lastVisited || "").getTime() - new Date(a.lastVisited || "").getTime();
        case "popular":
          return (b.visits || 0) - (a.visits || 0);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  return (
    <div className="bg-background font-baloo min-h-screen">
      <div className="container-responsive py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <div className="text-center mb-8">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${categoryInfo.color} flex items-center justify-center animate-glow`}>
              <CategoryIcon category={category as any} size="lg" />
            </div>
            
            <h1 className="responsive-title font-bold gradient-hero bg-clip-text text-transparent mb-4 animate-fade-in">
              {categoryInfo.title}
            </h1>
            
            <p className="text-muted-foreground responsive-text max-w-2xl mx-auto mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {categoryInfo.description}
            </p>

          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 hover-glow"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Visited</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Header with Stats */}
        <div className="animate-fade-in mb-8">
          <div className="flex items-center gap-4 mb-6 pb-3 border-b border-primary/20">
            <CategoryIcon category={category as any} size="lg" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-accent">
                {categoryInfo.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {categoryInfo.links.length} links • 
                {categoryInfo.links.filter(l => l.isFavorite).length} favorites
              </p>
            </div>
            <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-1"></div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredLinks.map((link, index) => (
            <Card 
              key={link.id} 
              className="p-3 sm:p-4 hover-lift transition-smooth animate-scale-in card-glow group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={`https://logo.clearbit.com/${link.domain}`}
                    alt={`${link.title} logo`}
                    className="w-10 h-10 rounded-lg object-cover bg-muted"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${link.title}&background=333&color=fff&size=40`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-smooth">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{link.domain}</p>
                  </div>
                </div>
                {link.isFavorite && <Heart className="w-5 h-5 text-red-500 fill-red-500 flex-shrink-0" />}
              </div>

              <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {link.visits} visits
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {link.lastVisited}
                  </span>
                </div>
              </div>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-smooth font-semibold"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Site
              </a>
            </Card>
          ))}
        </div>

        {filteredLinks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No links found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}