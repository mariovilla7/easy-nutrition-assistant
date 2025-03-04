
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, ...props }, ref) => {
    const [value, setValue] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      onSearch?.(newValue);
    };

    const handleClear = () => {
      setValue("");
      onSearch?.("");
    };

    return (
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          className={cn(
            "h-10 w-full rounded-full bg-muted/50 pl-10 pr-10 text-sm transition-all focus:ring-1 focus:ring-primary/20 focus-visible:outline-none",
            className
          )}
          {...props}
        />
        {value.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
