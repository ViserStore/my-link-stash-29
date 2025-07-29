import { useState, useEffect } from "react";
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
  icon: string;
  links: Link[];
}

interface ApiCategory {
  id: number;
  name: string;
  icon: string;
}

const Index = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://h5.trade-x-pro.com/api/cat.php');
        const data = await response.json();
        
        if (data.success) {
          const formattedCategories: Category[] = data.data.map((cat: ApiCategory) => ({
            id: cat.id.toString(),
            title: cat.name,
            icon: cat.icon,
            links: []
          }));
          setCategories(formattedCategories);
          if (formattedCategories.length > 0) {
            setSelectedCategory(formattedCategories[0].id);
          }
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, [toast]);

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
                  emoji={category.icon}
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
