import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, PlaneTakeoff, Trash2, List, Grid, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function FileList({ onViewChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(new Set());
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: files = [], isLoading } = useQuery({
    queryKey: ["/api/files"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (fileId) => {
      return apiRequest("DELETE", `/api/files/${fileId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["/api/files"]);
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    },
  });

  const filteredFiles = files.filter(file =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedFiles(new Set(filteredFiles.map(f => f.id)));
    } else {
      setSelectedFiles(new Set());
    }
  };

  const handleSelectFile = (fileId, checked) => {
    const newSelected = new Set(selectedFiles);
    if (checked) {
      newSelected.add(fileId);
    } else {
      newSelected.delete(fileId);
    }
    setSelectedFiles(newSelected);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

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
                data-testid="input-search-list"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              data-testid="button-send-list"
            >
              <PlaneTakeoff className="mr-2 w-4 h-4" />
              SEND
            </button>
            <button 
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors border border-border"
              data-testid="button-delete-list"
            >
              <Trash2 className="mr-2 w-4 h-4" />
              DELETE
            </button>
            <button 
              onClick={() => onViewChange('content-grid')}
              className="p-2 border border-border rounded hover:bg-secondary transition-colors"
              data-testid="button-grid-view-switch"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button className="p-2 border border-border rounded bg-secondary" data-testid="button-list-view-active">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden flex-1 flex flex-col">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-secondary text-sm font-medium">
            <div className="col-span-1">
              <input 
                type="checkbox" 
                className="text-primary"
                checked={selectedFiles.size === filteredFiles.length && filteredFiles.length > 0}
                onChange={(e) => handleSelectAll(e.target.checked)}
                data-testid="checkbox-select-all"
              />
            </div>
            <div className="col-span-1">Thumbnail</div>
            <div className="col-span-3">Title</div>
            <div className="col-span-2">Uploaded</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Size</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table Rows */}
          <div className="flex-1 overflow-y-auto">
            {filteredFiles.map((file) => (
              <div 
                key={file.id} 
                className="grid grid-cols-12 gap-4 p-4 border-b border-border hover:bg-secondary/50 transition-colors"
                data-testid={`file-row-${file.id}`}
              >
                <div className="col-span-1">
                  <input 
                    type="checkbox" 
                    className="text-primary"
                    checked={selectedFiles.has(file.id)}
                    onChange={(e) => handleSelectFile(file.id, e.target.checked)}
                    data-testid={`checkbox-${file.id}`}
                  />
                </div>
                <div className="col-span-1">
                  <img 
                    src={file.thumbnailUrl}
                    alt={`${file.title} thumbnail`}
                    className="w-12 h-9 object-cover rounded"
                  />
                </div>
                <div className="col-span-3">
                  <div className="font-medium" data-testid={`file-title-list-${file.id}`}>{file.title}</div>
                </div>
                <div className="col-span-2 text-muted-foreground text-sm">
                  {formatDate(file.uploadDate)}
                </div>
                <div className="col-span-2 text-muted-foreground text-sm">
                  {file.type}
                </div>
                <div className="col-span-2 text-muted-foreground text-sm">
                  {formatFileSize(file.size)}
                </div>
                <div className="col-span-1">
                  <button 
                    className="text-muted-foreground hover:text-foreground"
                    data-testid={`button-actions-${file.id}`}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredFiles.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-muted-foreground" data-testid="empty-state-list">
              No files found
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 border-t border-border bg-secondary/30">
            <div className="text-sm text-muted-foreground" data-testid="pagination-info">
              Records per page: 15 <span className="ml-4">15 of {filteredFiles.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 text-muted-foreground hover:text-foreground disabled:opacity-50" 
                disabled
                data-testid="button-prev-page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                className="p-2 text-muted-foreground hover:text-foreground"
                data-testid="button-next-page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
