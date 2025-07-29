import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, Upload, Globe } from "lucide-react";


interface ImageSelectorProps {
  selectedImage: string | null;
  onImageSelect: (imageId: string | null) => void;
  customImage: string | null;
  onCustomImageSelect: (imageUrl: string | null) => void;
  logoUrl: string | null;
  onLogoSelect: (logoUrl: string | null) => void;
  websiteUrl?: string;
}

export default function ImageSelector({ 
  selectedImage, 
  onImageSelect, 
  customImage, 
  onCustomImageSelect, 
  logoUrl, 
  onLogoSelect, 
  websiteUrl 
}: ImageSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoInput, setLogoInput] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onCustomImageSelect(result);
        onImageSelect(null); // Clear selected preset image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoGenerate = () => {
    if (logoInput.trim()) {
      const domain = logoInput.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      const logoUrl = `https://logo.clearbit.com/${domain}`;
      onLogoSelect(logoUrl);
      onImageSelect(null); // Clear selected preset image
      onCustomImageSelect(null); // Clear custom image
    }
  };

  const generateAutoLogo = () => {
    if (websiteUrl) {
      const domain = websiteUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      const autoLogoUrl = `https://logo.clearbit.com/${domain}`;
      onLogoSelect(autoLogoUrl);
      onImageSelect(null); // Clear selected preset image
      onCustomImageSelect(null); // Clear custom image
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium mb-3 block">Choose an Image (Optional)</label>
        
        {/* Custom Image Upload */}
        <div className="mb-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full mb-3"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Custom Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          {customImage && (
            <div className="relative w-full h-20 rounded-lg overflow-hidden border-2 border-primary glow-border mb-2">
              <img src={customImage} alt="Custom upload" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2">
                <div className="bg-primary rounded-full p-1">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logo Generator */}
        <div className="mb-4">
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="Enter website URL for logo"
              value={logoInput}
              onChange={(e) => setLogoInput(e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleLogoGenerate}
              disabled={!logoInput.trim()}
            >
              <Globe className="w-4 h-4" />
            </Button>
          </div>
          {websiteUrl && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={generateAutoLogo}
              className="text-sm"
            >
              Auto-generate logo from URL
            </Button>
          )}
          {logoUrl && (
            <div className="relative w-full h-20 rounded-lg overflow-hidden border-2 border-primary glow-border mb-2">
              <img 
                src={logoUrl} 
                alt="Website logo" 
                className="w-full h-full object-cover bg-white"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${logoInput}&background=333&color=fff&size=80`;
                }}
              />
              <div className="absolute top-2 right-2">
                <div className="bg-primary rounded-full p-1">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              </div>
            </div>
          )}
        </div>

        
        {(customImage || logoUrl) && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              onCustomImageSelect(null);
              onLogoSelect(null);
            }}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All Selections
          </Button>
        )}
      </div>
    </div>
  );
}