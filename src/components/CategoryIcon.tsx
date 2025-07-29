import { cn } from "@/lib/utils";

interface CategoryIconProps {
  imageUrl: string;
  categoryName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function CategoryIcon({ imageUrl, categoryName, size = "md", className }: CategoryIconProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  return (
    <div className={cn(
      "rounded-full overflow-hidden border-2 border-border bg-muted flex-shrink-0",
      sizeClasses[size],
      className
    )}>
      <img
        src={imageUrl}
        alt={`${categoryName} category`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${categoryName.charAt(0).toUpperCase()}&background=333&color=fff&size=${size === 'sm' ? '24' : size === 'md' ? '32' : '48'}`;
        }}
      />
    </div>
  );
}