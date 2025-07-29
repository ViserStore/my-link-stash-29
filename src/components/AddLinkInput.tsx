import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddLinkInputProps {
  onAddLink: (url: string) => void;
}

export default function AddLinkInput({ onAddLink }: AddLinkInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmedUrl = inputValue.trim();
    if (trimmedUrl) {
      onAddLink(trimmedUrl);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex gap-3 mb-10 flex-col sm:flex-row">
      <Input
        type="text"
        placeholder="Paste a link (e.g. https://example.com)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1 bg-card border-border text-foreground placeholder:text-muted-foreground"
      />
      <Button 
        onClick={handleAdd}
        variant="gradient"
        className="sm:w-auto w-full"
      >
        Add
      </Button>
    </div>
  );
}