import { cn } from "@/lib/utils";

interface LinkCardProps {
  title: string;
  url: string;
  domain: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function LinkCard({ title, url, domain, isSelected, onClick }: LinkCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-4 flex items-center gap-4 mb-3 transition-smooth cursor-pointer hover:bg-card-hover hover:border-muted",
        isSelected && "glow-border"
      )}
      onClick={onClick}
    >
      <img
        src={`https://logo.clearbit.com/${domain}`}
        alt={`${title} logo`}
        className="w-9 h-9 rounded-lg object-cover bg-muted"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = `https://ui-avatars.com/api/?name=${title}&background=333&color=fff&size=36`;
        }}
      />
      <div className="flex flex-col flex-1">
        <div className="font-semibold text-card-foreground text-base">{title}</div>
        {url && <div className="text-sm text-muted-foreground">{domain}</div>}
      </div>
    </div>
  );
}