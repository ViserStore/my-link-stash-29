import { cn } from "@/lib/utils";

const categoryImages = {
  food: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
  entertainment: "https://images.unsplash.com/photo-1489599537943-83c9e0ebe5f1?w=100&h=100&fit=crop", 
  shopping: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop",
  social: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop",
  work: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=100&h=100&fit=crop",
  education: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop"
};

// Support both old and new prop formats for backward compatibility
interface CategoryIconProps {
  // New props for API-driven categories
  imageUrl?: string;
  categoryName?: string;
  // Old prop for existing hardcoded categories
  category?: keyof typeof categoryImages;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CategoryIcon({ imageUrl, categoryName, category, size = "md", className }: CategoryIconProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  // Use new props if provided, otherwise fall back to old category prop
  const finalImageUrl = imageUrl || (category ? categoryImages[category] : '');
  const finalCategoryName = categoryName || category || 'category';

  return (
    <div className={cn(
      "rounded-full overflow-hidden border-2 border-border bg-muted flex-shrink-0",
      sizeClasses[size],
      className
    )}>
      <img
        src={finalImageUrl}
        alt={`${finalCategoryName} category`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${finalCategoryName.charAt(0).toUpperCase()}&background=333&color=fff&size=${size === 'sm' ? '24' : size === 'md' ? '32' : '48'}`;
        }}
      />
    </div>
  );
}