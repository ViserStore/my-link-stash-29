import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import AddLinkInput from "@/components/AddLinkInput";
import CategorySection from "@/components/CategorySection";

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

  

  return (
    <div className="bg-background font-baloo min-h-screen">
      <div className="container-responsive py-4 sm:py-6 lg:py-8">
        {/* Simplified Header */}
        <div className="mb-6 text-center">
          <h1 className="responsive-title font-bold gradient-hero bg-clip-text text-transparent mb-2 animate-fade-in">
            🌐 Links
          </h1>
        </div>

        {/* Main Content - Only Links */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-4 sm:p-6 card-glow animate-scale-in">
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
      </div>
    </div>
  );
};

export default Index;
