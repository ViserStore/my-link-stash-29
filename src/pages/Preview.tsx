import { useState } from "react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Share2, 
  Download, 
  Heart, 
  ExternalLink,
  TrendingUp,
  Clock,
  ChevronRight
} from "lucide-react";
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

interface Category {
  id: string;
  title: string;
  emoji: string;
  links: Link[];
}

// Enhanced sample data with more realistic content
const sampleCategories: Category[] = [
  {
    id: "food",
    title: "Food & Dining",
    emoji: "🍽️",
    links: [
      { id: "1", title: "Joe's Pizza", url: "https://joespizzanyc.com", domain: "joespizzanyc.com", visits: 45, lastVisited: "2 hours ago", isFavorite: true },
      { id: "2", title: "McDonald's", url: "https://mcdonalds.com", domain: "mcdonalds.com", visits: 23, lastVisited: "1 day ago" },
      { id: "9", title: "Domino's Pizza", url: "https://dominos.com", domain: "dominos.com", visits: 18, lastVisited: "3 days ago" },
      { id: "10", title: "KFC", url: "https://kfc.com", domain: "kfc.com", visits: 12, lastVisited: "1 week ago" },
      { id: "11", title: "Pizza Hut", url: "https://pizzahut.com", domain: "pizzahut.com", visits: 8, lastVisited: "2 weeks ago" },
      { id: "19", title: "Starbucks", url: "https://starbucks.com", domain: "starbucks.com", visits: 67, lastVisited: "1 hour ago", isFavorite: true },
    ],
  },
  {
    id: "entertainment",
    title: "Entertainment",
    emoji: "🎬",
    links: [
      { id: "3", title: "Netflix", url: "https://netflix.com", domain: "netflix.com", visits: 156, lastVisited: "30 min ago", isFavorite: true },
      { id: "4", title: "YouTube", url: "https://youtube.com", domain: "youtube.com", visits: 289, lastVisited: "1 hour ago", isFavorite: true },
      { id: "20", title: "Spotify", url: "https://spotify.com", domain: "spotify.com", visits: 78, lastVisited: "2 hours ago", isFavorite: true },
      { id: "21", title: "Disney+", url: "https://disneyplus.com", domain: "disneyplus.com", visits: 34, lastVisited: "1 day ago" },
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    emoji: "🛍️",
    links: [
      { id: "5", title: "Amazon", url: "https://amazon.com", domain: "amazon.com", visits: 134, lastVisited: "4 hours ago", isFavorite: true },
      { id: "6", title: "Zara", url: "https://zara.com", domain: "zara.com", visits: 28, lastVisited: "2 days ago" },
      { id: "22", title: "Nike", url: "https://nike.com", domain: "nike.com", visits: 19, lastVisited: "5 days ago" },
      { id: "23", title: "eBay", url: "https://ebay.com", domain: "ebay.com", visits: 42, lastVisited: "1 week ago" },
    ],
  },
  {
    id: "games",
    title: "Gaming",
    emoji: "🎮",
    links: [
      { id: "7", title: "Steam", url: "https://steampowered.com", domain: "steampowered.com", visits: 89, lastVisited: "3 hours ago", isFavorite: true },
      { id: "8", title: "Epic Games", url: "https://epicgames.com", domain: "epicgames.com", visits: 45, lastVisited: "1 day ago" },
      { id: "24", title: "Nintendo", url: "https://nintendo.com", domain: "nintendo.com", visits: 23, lastVisited: "3 days ago" },
      { id: "25", title: "PlayStation", url: "https://playstation.com", domain: "playstation.com", visits: 31, lastVisited: "1 week ago" },
    ],
  },
];

export default function Preview() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const filteredCategories = selectedCategory === "all" 
    ? sampleCategories 
    : sampleCategories.filter(cat => cat.id === selectedCategory);

  const allLinks = sampleCategories.flatMap(cat => 
    cat.links.map(link => ({ ...link, category: cat.title, categoryEmoji: cat.emoji }))
  );

  const searchedLinks = searchTerm 
    ? allLinks.filter(link => 
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.domain.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  return (
    <div className="bg-background font-baloo min-h-screen">
      <div className="container-responsive py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="responsive-title font-bold gradient-hero bg-clip-text text-transparent mb-4 animate-fade-in">
            🔗 Link Collection Preview
          </h1>
          <p className="text-muted-foreground responsive-text mb-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Browse through my organized collection of favorite links - beautifully curated for you
          </p>
          
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search links..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 hover-glow"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {sampleCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <CategoryIcon category={category.id as any} size="sm" />
                    {category.title}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

        {/* Content */}
        {searchTerm ? (
          /* Search Results */
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Search className="w-6 h-6 text-primary" />
              Search Results ({searchedLinks?.length || 0})
            </h2>
            
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {searchedLinks?.map((link, index) => (
                <Card 
                  key={link.id} 
                  className="p-3 sm:p-4 hover-lift transition-smooth animate-fade-in card-glow group"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={`https://logo.clearbit.com/${link.domain}`}
                        alt={`${link.title} logo`}
                        className="w-8 h-8 rounded-lg object-cover bg-muted"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${link.title}&background=333&color=fff&size=32`;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-smooth truncate">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">{link.domain}</p>
                      </div>
                    </div>
                    {link.isFavorite && <Heart className="w-4 h-4 text-red-500 fill-red-500 flex-shrink-0" />}
                  </div>

                  <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-xs">
                      {(link as any).categoryEmoji} {(link as any).category}
                    </Badge>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {link.visits}
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
                    className="flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-smooth"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Site
                  </a>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Category View */
          <div className="space-y-8">
            {filteredCategories.map((category, catIndex) => (
              <div key={category.id} className="animate-fade-in" style={{ animationDelay: `${catIndex * 0.1}s` }}>
                <div className="flex items-center gap-4 mb-6 pb-3 border-b border-primary/20">
                  <CategoryIcon category={category.id as any} size="lg" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-accent">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {category.links.length} links • 
                      {category.links.filter(l => l.isFavorite).length} favorites
                    </p>
                  </div>
                  <div className="h-px bg-gradient-to-r from-primary/50 to-transparent flex-1"></div>
                </div>

                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {category.links.slice(0, 6).map((link, index) => (
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

                {/* View More Button */}
                {category.links.length > 6 && (
                  <div className="mt-6 text-center">
                    <Link to={`/category/${category.id}`}>
                      <Button 
                        variant="outline" 
                        className="group hover:bg-primary hover:text-primary-foreground transition-smooth"
                      >
                        View More ({category.links.length - 6} more)
                        <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {((searchTerm && searchedLinks?.length === 0) || filteredCategories.length === 0) && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              No links found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try a different search term" : "Try selecting a different category or add some links first."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}