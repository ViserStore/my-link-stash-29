import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Search, Heart, TrendingUp } from "lucide-react";

const favoriteLinks = [
  { id: 1, title: "GitHub", url: "github.com", category: "Development", rating: 5, visits: 234 },
  { id: 2, title: "Netflix", url: "netflix.com", category: "Entertainment", rating: 5, visits: 189 },
  { id: 3, title: "Spotify", url: "spotify.com", category: "Music", rating: 4, visits: 156 },
  { id: 4, title: "Amazon", url: "amazon.com", category: "Shopping", rating: 4, visits: 143 },
  { id: 5, title: "YouTube", url: "youtube.com", category: "Entertainment", rating: 5, visits: 201 },
  { id: 6, title: "Stack Overflow", url: "stackoverflow.com", category: "Development", rating: 5, visits: 98 },
];

export default function Favorites() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredLinks = favoriteLinks.filter(link =>
    link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="container-responsive py-4 sm:py-6 lg:py-8">
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h1 className="responsive-title font-bold glow-text flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 mb-3 animate-fade-in">
          <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
          Favorite Links
        </h1>
        <p className="text-muted-foreground responsive-text max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Your most loved and frequently visited links - all in one place
        </p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md mx-auto sm:mx-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search favorites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 hover-glow"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredLinks.map((link, index) => (
          <Card 
            key={link.id} 
            className="p-4 sm:p-6 hover-lift transition-smooth animate-fade-in card-glow group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={`https://logo.clearbit.com/${link.url}`}
                  alt={`${link.title} logo`}
                  className="w-10 h-10 rounded-lg object-cover bg-muted"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${link.title}&background=random&size=40`;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-lg">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.url}</p>
                </div>
              </div>
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </div>

            <div className="flex items-center gap-2 mb-3">
              {renderStars(link.rating)}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs">
                {link.category}
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {link.visits} visits
              </span>
            </div>

            <Button
              variant="neon"
              className="w-full"
              onClick={() => window.open(`https://${link.url}`, '_blank')}
            >
              Visit Site
            </Button>
          </Card>
        ))}
      </div>

      {filteredLinks.length === 0 && (
        <div className="text-center py-12">
          <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No favorites found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try a different search term" : "Start adding some favorites!"}
          </p>
        </div>
      )}
    </div>
  );
}