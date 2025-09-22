import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, PlaneTakeoff, Trash2, List, Grid } from "lucide-react";

export default function ContentGrid({ onViewChange }) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: files = [], isLoading } = useQuery({
    queryKey: ["/api/files"],
  });

  const filteredFiles = files.filter(file =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-full p-6 flex items-center justify-center">
        <div className="text-muted-foreground">Loading files...</div>
      </div>
    );
  }

  return (
    <div className="h-full p-6">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search by Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground placeholder-muted-foreground w-64"
                data-testid="input-search"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              data-testid="button-send-grid"
            >
              <PlaneTakeoff className="mr-2 w-4 h-4" />
              SEND
            </button>
            <button 
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors border border-border"
              data-testid="button-delete-grid"
            >
              <Trash2 className="mr-2 w-4 h-4" />
              DELETE
            </button>
            <button 
              onClick={() => onViewChange('file-list')}
              className="p-2 border border-border rounded hover:bg-secondary transition-colors"
              data-testid="button-list-view"
            >
              <List className="w-4 h-4" />
            </button>
            <button className="p-2 border border-border rounded bg-secondary" data-testid="button-grid-view">
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-y-auto">
          {filteredFiles.map((file) => (
            <div key={file.id} className="video-card relative group cursor-pointer" data-testid={`video-card-${file.id}`}>
              <div className="aspect-video rounded-lg overflow-hidden bg-card">
                <img 
                  src={file.thumbnailUrl}
                  alt={file.title}
                  className="w-full h-full object-cover"
                />
                <div className="play-overlay absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-medium truncate" data-testid={`file-title-${file.id}`}>{file.title}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(file.uploadDate).toLocaleDateString()} ago
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-muted-foreground" data-testid="empty-state">
            No files found
          </div>
        )}
      </div>
    </div>
  );
}
