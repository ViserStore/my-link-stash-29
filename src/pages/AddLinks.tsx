import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Globe, Link2 } from "lucide-react";
import ImageSelector from "@/components/ImageSelector";
import CategoryIcon from "@/components/CategoryIcon";

export default function AddLinks() {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("https://h5.trade-x-pro.com/api/data.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          title: title || url,
          category,
          image: selectedImage || customImage || logoUrl
        }),
      });

      if (response.ok) {
        toast({
          title: "Link Added!",
          description: `Successfully added ${title || url} to ${category}`,
        });

        setUrl("");
        setCategory("");
        setTitle("");
        setSelectedImage(null);
        setCustomImage(null);
        setLogoUrl(null);
      } else {
        toast({
          title: "Error",
          description: "Failed to add link. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Could not connect to server. Please check your connection.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container-responsive py-4 sm:py-6 lg:py-8">
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h1 className="responsive-title font-bold glow-text flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 mb-3 animate-fade-in">
          <Plus className="w-6 h-6 sm:w-8 sm:h-8" />
          Add New Link
        </h1>
        <p className="text-muted-foreground responsive-text max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Expand your collection with new links and organize them by category
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-4 sm:p-6 card-glow animate-scale-in">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2 glow-text">
            <Link2 className="w-5 h-5 text-primary" />
            Link Details
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">URL *</label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Title (Optional)</label>
              <Input
                type="text"
                placeholder="Custom title for the link"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Category *</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category="food" size="sm" />
                      Food & Dining
                    </div>
                  </SelectItem>
                  <SelectItem value="entertainment">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category="entertainment" size="sm" />
                      Entertainment
                    </div>
                  </SelectItem>
                  <SelectItem value="shopping">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category="shopping" size="sm" />
                      Shopping
                    </div>
                  </SelectItem>
                  <SelectItem value="social">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category="social" size="sm" />
                      Social
                    </div>
                  </SelectItem>
                  <SelectItem value="work">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category="work" size="sm" />
                      Work
                    </div>
                  </SelectItem>
                  <SelectItem value="education">
                    <div className="flex items-center gap-2">
                      <CategoryIcon category="education" size="sm" />
                      Education
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <ImageSelector 
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
              customImage={customImage}
              onCustomImageSelect={setCustomImage}
              logoUrl={logoUrl}
              onLogoSelect={setLogoUrl}
              websiteUrl={url}
            />

            <Button type="submit" variant="gradient" className="w-full font-semibold">
              Add Link
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}