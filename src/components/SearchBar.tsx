
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error("Please enter a topic to search");
      return;
    }
    
    onSearch(searchQuery);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Search for a topic (e.g., Machine Learning, World War II)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow text-sm sm:text-base h-10 sm:h-11"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          className="bg-education-primary hover:bg-blue-600 text-white h-10 sm:h-11 px-4 sm:px-6 text-sm sm:text-base whitespace-nowrap"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              <span className="hidden sm:inline">Generating...</span>
              <span className="sm:hidden">Loading...</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Generate Course</span>
              <span className="sm:hidden">Generate</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
