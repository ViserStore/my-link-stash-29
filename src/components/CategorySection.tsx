import { cn } from "@/lib/utils";
import LinkCard from "./LinkCard";
import CategoryIcon from "./CategoryIcon";

interface Link {
  id: string;
  title: string;
  url: string;
  domain: string;
}

interface CategorySectionProps {
  title: string;
  emoji: string;
  categoryId: string;
  links: Link[];
  selectedCategory: string;
  selectedLink: string | null;
  onCategorySelect: (categoryId: string) => void;
  onLinkSelect: (linkId: string, categoryId: string) => void;
}

export default function CategorySection({
  title,
  emoji,
  categoryId,
  links,
  selectedCategory,
  selectedLink,
  onCategorySelect,
  onLinkSelect,
}: CategorySectionProps) {
  const isSelected = selectedCategory === categoryId;

  return (
    <div className="mb-5">
      <h2
        className={cn(
          "text-xl font-semibold mb-3 flex items-center gap-3 cursor-pointer transition-smooth",
          isSelected ? "glow-text" : "text-foreground hover:text-accent"
        )}
        onClick={() => onCategorySelect(categoryId)}
      >
        <CategoryIcon category={categoryId as any} size="md" />
        {title}
      </h2>
      <div className="mt-3">
        {links.map((link) => (
          <LinkCard
            key={link.id}
            title={link.title}
            url={link.url}
            domain={link.domain}
            isSelected={selectedLink === link.id}
            onClick={() => onLinkSelect(link.id, categoryId)}
          />
        ))}
      </div>
    </div>
  );
}